import * as React from 'react';
import * as S from './style';

import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import {
    FredCategoryEntry,
    FredParentNodeDTO,
    FredSeriesEntry,
    getFredChildNodes,
    getFredParentNodes,
} from 'endpoints/clients/fred';
import { formatDate } from 'common/constant/dates';
import HexLayer from 'components/Charting/HexLayer';
import { ColorsEnum } from 'common/theme';

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

export default function Economic() {
    const [titles, setTitles] = React.useState<FredParentNodeDTO>([]);

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
                console.log(res.data);
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
        <div style={{ width: '100%', height: '90vh' }}>
            <HexLayer baseId={'economicSearch'} />
            <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                {categoryLoading
                    ? 'Loading'
                    : nodes && nodes.value.selection.id === 0
                    ? Array(titles.length / 2)
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
                                          {entry.child_node.map(
                                              (child_entry: FredCategoryEntry) => (
                                                  <S.FredRow
                                                      key={`${child_entry.id}_FredChildRow`}
                                                      onClick={() => handleClick(child_entry)}
                                                  >
                                                      {child_entry.name}
                                                  </S.FredRow>
                                              )
                                          )}
                                      </div>
                                      <S.FredRow
                                          isTitle
                                          key={`${nextEntry.parent_node.id}_FredParentRow`}
                                      >
                                          {nextEntry.parent_node.name}
                                      </S.FredRow>
                                      {nextEntry.child_node.map(child_entry => (
                                          <S.FredRow key={`${child_entry.id}_FredChildRow`}>
                                              {child_entry.name}
                                          </S.FredRow>
                                      ))}
                                  </div>
                              );
                          })
                    : null}
            </div>
            {nodes && nodes.value.selection.id !== 0 ? (
            <S.PanelOpener>
                    <>
                        <S.SidePanelOpener>
                            <S.ChildNodesPanel>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <S.IconButtonWrapper onClick={handleBack}>
                                        <ArrowBackIosIcon fontSize="inherit" />
                                    </S.IconButtonWrapper>
                                    <S.FredRow
                                        isTitle
                                        key={`${nodes.value.selection.id}_FredParentRow`}
                                    >
                                        {nodes.value.selection.name}
                                    </S.FredRow>
                                </div>
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
                            </S.ChildNodesPanel>
                            <S.UpdateBar variant="subtitle2" align="right">
                                <div style={{ width: '100%' }}>
                                    <strong>Last Updated:</strong>{' '}
                                    {titles.length !== 0
                                        ? formatDate(titles[0].parent_node.last_updated)
                                        : null}{' '}
                                </div>
                            </S.UpdateBar>
                        </S.SidePanelOpener>
                        <S.MainPanelOpener>
                            {nodes && nodes.value.type === 'series'
                                ? nodes.value.entries.map(seriesEntry => {
                                      const series = seriesEntry as FredSeriesEntry;
                                      return (
                                          <div
                                              key={`${nodes.value.selection.id}_${series.id}`}
                                              style={{ padding: 10 }}
                                          >
                                              <div style={{ display: 'flex' }}>
                                                  <div style={{ display: 'flex', width: '70%', gap: 10 }}>
                                                    <Typography
                                                        variant="subtitle2"
                                                          style={{ color: ColorsEnum.coolgray1 }}
                                                    >{`${series.id}:FRED`}</Typography>
                                                    <Typography variant="subtitle2">{`${series.title}`}</Typography>
                                                  </div>
                                                  <div style={{ display: 'flex', width: '30%' }}>
                                                    <Typography variant="subtitle2" align="right" style={{ width: '100%'}}>
                                                        {formatDate(series.last_updated)}
                                                    </Typography>
                                                  </div>
                                              </div>
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
                                              <div>
                                                    <Typography variant="subtitle2" style={{ color: ColorsEnum.warmgray3 }}>
                                                        Observation Frequency: {series.frequency}  
                                                    </Typography>
                                                  </div>
                                          </div>
                                      );
                                  })
                                : null}
                        </S.MainPanelOpener>
                    </>
            </S.PanelOpener>
            ) : null}
        </div>
    );
}
