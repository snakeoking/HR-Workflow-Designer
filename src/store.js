import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge({ ...connection, animated: true }, get().edges),
    });
  },

  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  updateNodeData: (id, data) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, ...data } };
        }
        return node;
      }),
      // Also update selectedNode if it's the currently selected one
      selectedNode: get().selectedNode?.id === id 
        ? { ...get().selectedNode, data: { ...get().selectedNode.data, ...data } }
        : get().selectedNode
    });
  },

  setSelectedNode: (node) => {
    set({ selectedNode: node });
  },
  
  clearSelectedNode: () => {
    set({ selectedNode: null });
  }
}));
