import React from 'react';
import { Handle, Position } from 'reactflow';
import { Play, CheckSquare, UserCheck, Zap, Square } from 'lucide-react';

const NodeWrapper = ({ children, title, icon: Icon, borderColor, bgColor, textColor, className = '' }) => (
  <div className={`px-4 py-3 bg-white rounded-xl border-2 shadow-sm min-w-[200px] ${borderColor} ${className}`}>
    <div className="flex items-center gap-3 mb-2">
      <div className={`p-2 rounded-lg ${bgColor} ${textColor}`}>
        <Icon size={16} strokeWidth={2.5} />
      </div>
      <div className="font-semibold text-slate-800 text-sm">{title}</div>
    </div>
    <div className="text-xs text-slate-500">
      {children}
    </div>
  </div>
);

export const StartNode = ({ data }) => {
  return (
    <>
      <NodeWrapper 
        title={data.title || 'Start'} 
        icon={Play} 
        borderColor="border-emerald-500"
        bgColor="bg-emerald-100"
        textColor="text-emerald-600"
      >
        Trigger Event
      </NodeWrapper>
      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-emerald-500" />
    </>
  );
};

export const TaskNode = ({ data }) => {
  return (
    <>
      <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-slate-400" />
      <NodeWrapper 
        title={data.title || 'Manual Task'} 
        icon={CheckSquare} 
        borderColor="border-blue-500"
        bgColor="bg-blue-100"
        textColor="text-blue-600"
      >
        <div className="flex flex-col gap-1">
          {data.assignee && <span>👤 {data.assignee}</span>}
          {data.dueDate && <span>📅 {data.dueDate}</span>}
        </div>
      </NodeWrapper>
      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-blue-500" />
    </>
  );
};

export const ApprovalNode = ({ data }) => {
  return (
    <>
      <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-slate-400" />
      <NodeWrapper 
        title={data.title || 'Approval Needed'} 
        icon={UserCheck} 
        borderColor="border-purple-500"
        bgColor="bg-purple-100"
        textColor="text-purple-600"
      >
        {data.approverRole && <span>Role: {data.approverRole}</span>}
      </NodeWrapper>
      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-purple-500" />
    </>
  );
};

export const AutomatedNode = ({ data }) => {
  return (
    <>
      <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-slate-400" />
      <NodeWrapper 
        title={data.title || 'Automated Action'} 
        icon={Zap} 
        borderColor="border-orange-500"
        bgColor="bg-orange-100"
        textColor="text-orange-600"
      >
        {data.actionType && <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-600 border border-slate-200">{data.actionType}</span>}
      </NodeWrapper>
      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-orange-500" />
    </>
  );
};

export const EndNode = ({ data }) => {
  return (
    <>
      <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-slate-400" />
      <NodeWrapper 
        title={data.title || 'End'} 
        icon={Square} 
        borderColor="border-red-500"
        bgColor="bg-red-100"
        textColor="text-red-600"
      >
        Workflow Complete
      </NodeWrapper>
    </>
  );
};

export const nodeTypes = {
  startNode: StartNode,
  taskNode: TaskNode,
  approvalNode: ApprovalNode,
  automatedNode: AutomatedNode,
  endNode: EndNode,
};
