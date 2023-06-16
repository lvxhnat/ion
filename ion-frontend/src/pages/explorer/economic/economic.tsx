import * as React from 'react';
import * as S from './style';
import {
    FredEntry,
    FredParentNodeDTO,
    getFredChildNodes,
    getFredParentNodes,
} from 'endpoints/clients/fred';
import { formatDate } from 'common/constant/dates';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HexLayer from 'components/Charting/HexLayer';

class NodeValue {
    type: 'series' | 'category'; // Whether this current node is a series or category
    selection: FredEntry;
    entries: FredEntry[]; // The entries contained in this current node
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

    const [nodes, setNodes] = React.useState<DoublyLinkedListNode>();

    React.useEffect(() => {
        getFredParentNodes().then(res => {
            setTitles(res.data);
        }); // Store the initial set of viewable nodes
    }, []);

    const handleBack = () => {
        let newNodes = nodes;
        if (newNodes && newNodes.prev) {
            setNodes(DoublyLinkedListNode.fromNode(newNodes.prev));
        }
    };

    const handleClick = (entry: FredEntry) => {
        if (!nodes) {
            getFredChildNodes(entry.id).then(res => {
                setNodes(
                    new DoublyLinkedListNode({
                        type: res.data.type,
                        selection: entry,
                        entries: res.data.data,
                    })
                );
            });
        } else {
            let newNodes = nodes;
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
                    newNodes = newNodes.next;
                    newNodes.prev = prevNode;
                    setNodes(newNodes);
                });
            }
        }
    };

    return (
        <div style={{ width: '100%', height: '90vh' }}>
            <HexLayer baseId={'economicSearch'} />
            <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                {!nodes
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
                                          {entry.child_node.map((child_entry: FredEntry) => (
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
                                          <S.FredRow key={`${child_entry.id}_FredChildRow`}>
                                              {child_entry.name}
                                          </S.FredRow>
                                      ))}
                                  </div>
                              );
                          })
                    : null}
            </div>
            <S.PanelOpener>
                <S.SidePanelOpener>
                    <S.ChildNodesPanel>
                        {nodes ? (
                            <>
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
                                {nodes.value.entries.map(entry => {
                                    return (
                                        <S.FredRow
                                            key={`${entry.id}_FredSubChildRow`}
                                            onClick={() => handleClick(entry)}
                                        >
                                            {entry.name}
                                        </S.FredRow>
                                    );
                                })}
                            </>
                        ) : null}
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
                <S.MainPanelOpener></S.MainPanelOpener>
            </S.PanelOpener>
        </div>
    );
}
