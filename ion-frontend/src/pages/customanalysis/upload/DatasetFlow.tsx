import * as React from 'react';
import * as S from '../style';

import ReactFlow, { Background, applyNodeChanges, applyEdgeChanges, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';

export default function DatasetFlow(props: { labels: string[] }) {
    const [nodes, setNodes] = React.useState<any>([]);
    const [edges, setEdges] = React.useState<any>([]);

    React.useEffect(() => {
        setNodes(
            props.labels.map((label: string, index: number) => {
                return {
                    id: index.toString(),
                    data: { label: label },
                    position: { x: 100, y: 75 },
                    type: 'input',
                };
            })
        );
    }, [props.labels]);

    const onNodesChange = React.useCallback(
        (changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
        [setNodes]
    );

    const onEdgesChange = React.useCallback(
        (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );

    const onConnect = React.useCallback(
        (params: any) => setEdges((eds: any) => addEdge(params, eds)),
        [setEdges]
    );

    return (
        <S.DatasetFlowWrapper>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                proOptions={{ hideAttribution: true }}
            >
                <Background />
            </ReactFlow>
        </S.DatasetFlowWrapper>
    );
}
