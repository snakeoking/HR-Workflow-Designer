import React from 'react';
import { Play, CheckSquare, UserCheck, Zap, Square } from 'lucide-react';

const nodeTypes = [
  { type: 'startNode', label: 'Start Event', icon: Play, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  { type: 'taskNode', label: 'Manual Task', icon: CheckSquare, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
  { type: 'approvalNode', label: 'Approval', icon: UserCheck, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200' },
  { type: 'automatedNode', label: 'Automated Action', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' },
  { type: 'endNode', label: 'End Event', icon: Square, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
];

export const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-full z-10 shadow-sm relative">
      <div className="p-5 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">HR Elements</h2>
        <p className="text-xs text-slate-500 mt-1">Drag and drop to build</p>
      </div>
      <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto">
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            className={`p-3 border rounded-lg cursor-grab hover:shadow-md transition-all flex items-center gap-3 bg-white ${node.border}`}
            onDragStart={(event) => onDragStart(event, node.type)}
            draggable
          >
            <div className={`p-2 rounded-md ${node.bg} ${node.color}`}>
              <node.icon size={18} strokeWidth={2.5} />
            </div>
            <span className="font-medium text-sm text-slate-700">{node.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
