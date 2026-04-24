import React, { useRef, useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { useStore } from '../store';
import { nodeTypes } from '../nodes/CustomNodes';

let id = 0;
const getId = () => `dndnode_${id++}`;

export const Canvas = () => {
  const reactFlowWrapper = useRef(null);
  
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onConnect = useStore((state) => state.onConnect);
  const addNode = useStore((state) => state.addNode);
  const setSelectedNode = useStore((state) => state.setSelectedNode);
  const clearSelectedNode = useStore((state) => state.clearSelectedNode);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left - 100, // offset for node center
        y: event.clientY - reactFlowBounds.top - 40,
      };

      const defaultData = {
        startNode: { title: 'Start Workflow' },
        taskNode: { title: 'New Task', assignee: '', dueDate: '' },
        approvalNode: { title: 'Pending Approval', approverRole: '' },
        automatedNode: { title: 'System Action', actionType: '' },
        endNode: { title: 'End Workflow' },
      };

      const newNode = {
        id: getId(),
        type,
        position,
        data: defaultData[type] || { title: 'New Node' },
      };

      addNode(newNode);
    },
    [addNode]
  );

  const onNodeClick = (_, node) => {
    setSelectedNode(node);
  };

  const onPaneClick = () => {
    clearSelectedNode();
  };

  return (
    <div className="flex-1 h-full w-full relative" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        className="bg-slate-50"
      >
        <Background color="#cbd5e1" gap={16} size={1} />
        <Controls className="!bg-white !border-slate-200 !shadow-sm !rounded-lg" />
      </ReactFlow>
    </div>
  );
};
