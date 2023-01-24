import { useState, useCallback, useEffect } from 'react';
import ReactFlow, { Background, applyNodeChanges, applyEdgeChanges, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';

export default function DatasetFlow(props: { labels: string[] }) {
    const [nodes, setNodes] = useState<any>([]);
    const [edges, setEdges] = useState<any>([]);

    useEffect(() => {
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

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
        [setNodes]
    );

    const onEdgesChange = useCallback(
        (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );

    const onConnect = useCallback(
        (params: any) => setEdges((eds: any) => addEdge(params, eds)),
        [setEdges]
    );

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid transparent',
                width: '100%',
                flex: 1,
            }}
        >
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
        </div>
    );
}
