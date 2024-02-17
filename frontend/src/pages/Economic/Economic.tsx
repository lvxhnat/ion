import * as React from 'react';
import * as S from './style';

import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import {
    FredCategoryEntry,
    FredParentNodeDTO,
    FredSeriesEntry,
    getFredChildNodes,
    getFredParentNodes,
} from 'endpoints/clients/fred';

import { DoublyLinkedListNode } from './DoublyLinkedListNode';
import SeriesSelection from './SeriesSelection';
import SelectedSeriesSidebar from './SelectedSeriesSidebar';
import SelectedSeriesMainview from './SelectedSeriesMainview';
import { ContainerWrapper } from 'components/Wrappers/ContainerWrapper';

export default function Economic() {
    const [titles, setTitles] = React.useState<FredParentNodeDTO>([]);
    const [seriesSelected, setSeriesSelected] = React.useState<FredSeriesEntry>();

    const [rootLoading, setRootLoading] = React.useState<boolean>(false);
    const [categoryLoading, setCategoryLoading] = React.useState<boolean>(false);

    const [nodes, setNodes] = React.useState<DoublyLinkedListNode>();

    React.useEffect(() => {
        setRootLoading(true);
        getFredParentNodes().then(res => {
            setTitles(res.data);
            setNodes(
                new DoublyLinkedListNode({
                    type: 'category',
                    selection: { id: 0, parent_id: 0, name: 'global', last_updated: '' },
                    entries: res.data.map(entry => entry.child_node).flat(),
                })
            );
            setRootLoading(false);
        });
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

    return (
        <ContainerWrapper>
            {categoryLoading || rootLoading ? (
                <S.LoadingWrapper>
                    <CircularProgress color="secondary" />
                    <Typography variant="h3"> Loading Data ... </Typography>
                </S.LoadingWrapper>
            ) : nodes && nodes.value.selection.id === 0 ? (
                <div
                    id="series-container"
                    style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}
                >
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
                                <SelectedSeriesSidebar
                                    nodes={nodes}
                                    seriesSelected={seriesSelected}
                                />
                            ) : (
                                <></>
                            )}
                        </S.ChildNodesPanel>
                    </S.SidePanelOpener>
                    <S.MainPanelOpener>
                        <SelectedSeriesMainview nodes={nodes} seriesSelected={seriesSelected} />
                        <SeriesSelection nodes={nodes} setSeriesSelected={setSeriesSelected} />
                    </S.MainPanelOpener>
                </S.PanelOpener>
            ) : null}
        </ContainerWrapper>
    );
}
