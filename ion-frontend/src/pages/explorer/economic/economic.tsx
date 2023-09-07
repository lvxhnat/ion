import * as React from 'react';
import * as S from './style';
import { v4 as uuidv4 } from 'uuid';

import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import {
    FredCategoryEntry,
    FredParentNodeDTO,
    FredSeriesEntry,
    getFredChildNodes,
    getFredParentNodes,
} from 'endpoints/clients/fred';
import { ColorsEnum } from 'common/theme';
import { formatDate } from 'common/constant/dates';
import HexLayer from 'components/Charting/HexLayer';
import { SingleChartview } from 'components/Analysis/Chartview';
import { ASSET_TYPES, SOURCE_TYPES } from 'common/constant';
import { deleteTable, insertTable } from 'endpoints/clients/database/postgres/general';
import { PostgresTablesEnum } from 'endpoints/schema/database/postgres/props';
import { getWatchlistAssets } from 'endpoints/clients/database/postgres/query';
import { getUniqueTickerId } from 'common/constant/ids';
import DateRangeSelector, {
    PeriodChoices,
} from 'components/Select/DateRangeSelector/DateRangeSelector';

class NodeValue {
    type: 'series' | 'category'; // Whether this current node is a series or category
    selection: FredCategoryEntry;
    entries: FredCategoryEntry[] | FredSeriesEntry[]; // The entries contained in this current node
}

class DoublyLinkedListNode {
    public value: NodeValue;
    public next: DoublyLinkedListNode | null;
    public prev: DoublyLinkedListNode | null;

    constructor(value: NodeValue) {
        this.value = value;
    }

    public static fromNode(node: DoublyLinkedListNode): DoublyLinkedListNode {
        let newNode = new DoublyLinkedListNode(node.value);
        newNode.next = node.next;
        newNode.prev = node.prev;
        return newNode;
    }
}

const AddToWatchlistButton = (props: { symbol: string }) => {
    const [watchlistAdded, setWatchlistAdded] = React.useState<boolean>(false);

    React.useEffect(() => {
        getWatchlistAssets({ symbol: props.symbol }).then(res => {
            setWatchlistAdded(!!res.data);
        });
    }, [props.symbol]);

    const handleWatchlist = () => {
        setWatchlistAdded(!watchlistAdded);
        getWatchlistAssets({ symbol: props.symbol }).then(res => {
            if (!res.data) {
                insertTable({
                    tableName: PostgresTablesEnum.WATCHLIST,
                    entry: {
                        uuid: uuidv4(),
                        symbol: props.symbol,
                        date_added: new Date(),
                        asset_type: ASSET_TYPES.FRED as keyof typeof ASSET_TYPES,
                        source: SOURCE_TYPES.FRED as keyof typeof SOURCE_TYPES,
                    },
                });
            } else {
                deleteTable({
                    tableName: PostgresTablesEnum.WATCHLIST,
                    id: props.symbol,
                });
            }
        });
    };

    return (
        <S.ButtonWrapper selected={watchlistAdded} onClick={handleWatchlist}>
            {watchlistAdded ? <DoneIcon fontSize="inherit" /> : <AddIcon fontSize="inherit" />}
            <Typography variant="subtitle2">
                {watchlistAdded ? 'Added to Watchlist' : 'Add to Watchlist'}
            </Typography>
        </S.ButtonWrapper>
    );
};

export default function Economic() {
    const [titles, setTitles] = React.useState<FredParentNodeDTO>([]);
    const [period, setPeriod] = React.useState<PeriodChoices>('Max');
    const [seriesSelected, setSeriesSelected] = React.useState<FredSeriesEntry>();

    const [categoryLoading, setCategoryLoading] = React.useState<boolean>(false);

    const [nodes, setNodes] = React.useState<DoublyLinkedListNode>();

    React.useEffect(() => {
        getFredParentNodes().then(res => {
            setTitles(res.data);
            setNodes(
                new DoublyLinkedListNode({
                    type: 'category',
                    selection: { id: 0, parent_id: 0, name: 'global', last_updated: '' },
                    entries: res.data.map(entry => entry.child_node).flat(),
                })
            );
        }); // Store the initial set of viewable nodes
    }, []);

    const handleBack = () => {
        let newNodes = nodes;
        if (newNodes && newNodes.prev) {
            setNodes(DoublyLinkedListNode.fromNode(newNodes.prev));
        }
        setSeriesSelected(undefined);
    };

    const handleClick = (entry: FredCategoryEntry) => {
        setCategoryLoading(true);
        let newNodes: DoublyLinkedListNode = nodes!; // Nodes will exist here otherwise its not possible for us to click
        const prevNode: DoublyLinkedListNode = DoublyLinkedListNode.fromNode(newNodes);
        if (newNodes.next && newNodes.next.value.selection.id === entry.id) {
            newNodes = newNodes.next;
            newNodes.prev = prevNode;
            setNodes(newNodes);
        } else {
            getFredChildNodes(entry.id).then(res => {
                newNodes.next = new DoublyLinkedListNode({
                    type: res.data.type,
                    selection: entry,
                    entries: res.data.data,
                });
                // This ensures that we will always stop at a category node, not a series node
                newNodes = newNodes.next;
                newNodes.prev = prevNode;
                setNodes(DoublyLinkedListNode.fromNode(newNodes));
                setCategoryLoading(false);
            });
        }
        setCategoryLoading(false);
    };

    const sortSeriesEntries = (
        a: FredCategoryEntry | FredSeriesEntry,
        b: FredCategoryEntry | FredSeriesEntry
    ) => {
        const firstEntry = a as FredSeriesEntry;
        const secondEntry = b as FredSeriesEntry;
        if (firstEntry.popularity > secondEntry.popularity) return -1;
        if (firstEntry.popularity < secondEntry.popularity) return 1;
        return 0;
    };

    return (
        <div style={{ width: '100%', height: '92vh' }}>
            {categoryLoading ? (
                'Loading'
            ) : nodes && nodes.value.selection.id === 0 ? (
                <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                    <HexLayer baseId={'economicSearch'} />
                    {Array(titles.length / 2)
                        .fill(0)
                        .map((_, index) => {
                            const entry = titles[index * 2];
                            const nextEntry = titles[index * 2 + 1];
                            return (
                                <div
                                    key={`${entry.parent_node.id}_FredChildDiv`}
                                    style={{ width: '25%' }}
                                >
                                    <div style={{ paddingBottom: 25, paddingTop: 10 }}>
                                        <S.FredRow
                                            isTitle
                                            key={`${entry.parent_node.id}_FredParentRow`}
                                        >
                                            {entry.parent_node.name}
                                        </S.FredRow>
                                        {entry.child_node.map((child_entry: FredCategoryEntry) => (
                                            <S.FredRow
                                                key={`${child_entry.id}_FredChildRow`}
                                                onClick={() => handleClick(child_entry)}
                                            >
                                                {child_entry.name}
                                            </S.FredRow>
                                        ))}
                                    </div>
                                    <S.FredRow
                                        isTitle
                                        key={`${nextEntry.parent_node.id}_FredParentRow`}
                                    >
                                        {nextEntry.parent_node.name}
                                    </S.FredRow>
                                    {nextEntry.child_node.map(child_entry => (
                                        <S.FredRow
                                            key={`${child_entry.id}_FredChildRow`}
                                            onClick={() => handleClick(child_entry)}
                                        >
                                            {child_entry.name}
                                        </S.FredRow>
                                    ))}
                                </div>
                            );
                        })}
                </div>
            ) : null}
            {nodes && nodes.value.selection.id !== 0 ? (
                <S.PanelOpener>
                    <>
                        <S.SidePanelOpener>
                            <S.ChildNodesPanel>
                                <S.BaseDivClass>
                                    <S.IconButtonWrapper onClick={handleBack}>
                                        <ArrowBackIosIcon fontSize="inherit" />
                                    </S.IconButtonWrapper>
                                    <S.FredRow
                                        isTitle
                                        key={`${nodes.value.selection.id}_FredParentRow`}
                                    >
                                        {nodes.value.selection.name}
                                    </S.FredRow>
                                </S.BaseDivClass>
                                {nodes.value.type === 'series'
                                    ? null
                                    : nodes.value.entries.map(entry => {
                                          return (
                                              <S.FredRow
                                                  key={`${entry.id}_FredSubChildRow`}
                                                  onClick={() =>
                                                      handleClick(entry as FredCategoryEntry)
                                                  }
                                              >
                                                  {(entry as FredCategoryEntry).name}
                                              </S.FredRow>
                                          );
                                      })}
                                {/* Generate side panel texts to describe series when series are selected */}
                                {seriesSelected ? (
                                    <div style={{ padding: 10 }}>
                                        <Typography
                                            variant="body1"
                                            style={{ color: ColorsEnum.beer }}
                                        >
                                            {getUniqueTickerId(
                                                SOURCE_TYPES.FRED as keyof typeof SOURCE_TYPES,
                                                seriesSelected.id
                                            )}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            style={{ color: ColorsEnum.beer10, paddingBottom: 15 }}
                                        >
                                            {' '}
                                            {seriesSelected.title} ({seriesSelected.units_short}){' '}
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            style={{
                                                color: ColorsEnum.warmgray2,
                                                paddingBottom: 10,
                                            }}
                                        >
                                            {seriesSelected.notes}
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            variantMapping={{
                                                subtitle2: 'span', // or any other variant you want to use
                                            }}
                                        >
                                            <span style={{ fontWeight: 'bold' }}> Units: </span>
                                            {seriesSelected.units} ({seriesSelected.units_short})
                                        </Typography>
                                        <Typography
                                            component="div"
                                            variant="subtitle2"
                                            variantMapping={{
                                                subtitle2: 'span', // or any other variant you want to use
                                            }}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>
                                                {' '}
                                                Seasonal Adjustment:{' '}
                                            </span>
                                            {seriesSelected.seasonal_adjustment} (
                                            {seriesSelected.seasonal_adjustment_short})
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            <span style={{ fontWeight: 'bold' }}>
                                                {' '}
                                                Series Search Popularity:{' '}
                                            </span>
                                            {seriesSelected.popularity}
                                        </Typography>

                                        <Typography variant="subtitle2" style={{ paddingTop: 10 }}>
                                            <span style={{ fontWeight: 'bold' }}>
                                                {' '}
                                                Observation Period:{' '}
                                            </span>
                                            {seriesSelected.observation_start} to{' '}
                                            {seriesSelected.observation_end}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            <span style={{ fontWeight: 'bold' }}>
                                                {' '}
                                                Observation Frequency:{' '}
                                            </span>
                                            {seriesSelected.frequency} (
                                            {seriesSelected.frequency_short})
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            style={{ color: ColorsEnum.warmgray5, paddingTop: 10 }}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>
                                                {' '}
                                                Observation Frequency:{' '}
                                            </span>

                                            {formatDate(seriesSelected.last_updated)}
                                        </Typography>
                                        <div style={{ paddingTop: 10 }}>
                                            <AddToWatchlistButton symbol={seriesSelected.id} />
                                        </div>
                                    </div>
                                ) : null}
                            </S.ChildNodesPanel>
                            <S.UpdateBar>
                                <Typography variant="subtitle2" align="right" component="div">
                                    <strong>Last Updated:</strong>{' '}
                                    {titles.length !== 0
                                        ? formatDate(titles[0].parent_node.last_updated)
                                        : null}{' '}
                                </Typography>
                            </S.UpdateBar>
                        </S.SidePanelOpener>
                        <S.MainPanelOpener>
                            {seriesSelected ? (
                                <div style={{ padding: 10, paddingTop: 0, paddingBottom: 25 }}>
                                    <DateRangeSelector />
                                    <SingleChartview
                                        ticker={seriesSelected.id}
                                        assetType={ASSET_TYPES.FRED as keyof typeof ASSET_TYPES}
                                    />
                                </div>
                            ) : (
                                <></>
                            )}
                            <S.SeriesPanel>
                                {nodes && nodes.value.type === 'series'
                                    ? nodes.value.entries
                                          .sort(sortSeriesEntries)
                                          .map(seriesEntry => {
                                              const series = seriesEntry as FredSeriesEntry;
                                              return (
                                                  <S.SeriesContainer
                                                      onClick={() => setSeriesSelected(series)}
                                                      key={`${nodes.value.selection.id}_${series.id}`}
                                                  >
                                                      <S.BaseDivClass>
                                                          <S.BaseDivClass
                                                              style={{
                                                                  width: '75%',
                                                                  gap: 10,
                                                              }}
                                                          >
                                                              <Typography
                                                                  variant="subtitle2"
                                                                  style={{
                                                                      color: ColorsEnum.coolgray1,
                                                                  }}
                                                              >{`${series.id}:FRED`}</Typography>
                                                              <Typography variant="subtitle2">{`${series.title} (${series.units_short})`}</Typography>
                                                          </S.BaseDivClass>
                                                          <S.BaseDivClass style={{ width: '25%' }}>
                                                              <Typography
                                                                  variant="subtitle2"
                                                                  align="right"
                                                                  style={{ width: '100%' }}
                                                              >
                                                                  Last Updated:{' '}
                                                                  {formatDate(series.last_updated)}
                                                              </Typography>
                                                          </S.BaseDivClass>
                                                      </S.BaseDivClass>
                                                      <Typography
                                                          variant="subtitle2"
                                                          noWrap
                                                          style={{
                                                              width: '100%',
                                                              color: ColorsEnum.coolgray5,
                                                          }}
                                                      >
                                                          {series.notes}
                                                      </Typography>
                                                      <div
                                                          style={{
                                                              display: 'flex',
                                                              width: '100%',
                                                              color: ColorsEnum.warmgray3,
                                                          }}
                                                      >
                                                          <Typography
                                                              variant="subtitle2"
                                                              style={{ width: '50%' }}
                                                          >
                                                              Observation Frequency:{' '}
                                                              {series.frequency}
                                                          </Typography>
                                                          <Typography
                                                              variant="subtitle2"
                                                              align="right"
                                                              style={{ width: '50%' }}
                                                          >
                                                              {`Period: ${series.realtime_start} to ${series.realtime_end}`}
                                                          </Typography>
                                                      </div>
                                                  </S.SeriesContainer>
                                              );
                                          })
                                    : null}
                            </S.SeriesPanel>
                        </S.MainPanelOpener>
                    </>
                </S.PanelOpener>
            ) : null}
        </div>
    );
}
