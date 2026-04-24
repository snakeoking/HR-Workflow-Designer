import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Settings, X } from 'lucide-react';
import { fetchAutomations } from '../api';

export const ConfigPanel = () => {
  const selectedNode = useStore((state) => state.selectedNode);
  const updateNodeData = useStore((state) => state.updateNodeData);
  const clearSelectedNode = useStore((state) => state.clearSelectedNode);
  
  const [automations, setAutomations] = useState([]);

  useEffect(() => {
    if (selectedNode?.type === 'automatedNode') {
      fetchAutomations().then(setAutomations);
    }
  }, [selectedNode?.type]);

  if (!selectedNode) {
    return null;
  }

  const handleChange = (field, value) => {
    updateNodeData(selectedNode.id, { [field]: value });
  };

  return (
    <div className="absolute right-4 top-4 w-80 bg-white shadow-xl rounded-xl border border-slate-200 z-50 overflow-hidden flex flex-col max-h-[80vh]">
      <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-slate-700">
          <Settings size={18} />
          <h3 className="font-semibold text-sm">Node Settings</h3>
        </div>
        <button onClick={clearSelectedNode} className="text-slate-400 hover:text-slate-600 transition-colors">
          <X size={18} />
        </button>
      </div>

      <div className="p-5 flex-1 overflow-y-auto space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
            Node Title
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            value={selectedNode.data.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>

        {selectedNode.type === 'taskNode' && (
          <>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Assignee
              </label>
              <input
                type="text"
                placeholder="e.g. HR Manager"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                value={selectedNode.data.assignee || ''}
                onChange={(e) => handleChange('assignee', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Due Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                value={selectedNode.data.dueDate || ''}
                onChange={(e) => handleChange('dueDate', e.target.value)}
              />
            </div>
          </>
        )}

        {selectedNode.type === 'approvalNode' && (
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Approver Role
            </label>
            <select
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              value={selectedNode.data.approverRole || ''}
              onChange={(e) => handleChange('approverRole', e.target.value)}
            >
              <option value="">Select a role...</option>
              <option value="Direct Manager">Direct Manager</option>
              <option value="Department Head">Department Head</option>
              <option value="HR Director">HR Director</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
        )}

        {selectedNode.type === 'automatedNode' && (
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Action Type
            </label>
            <select
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              value={selectedNode.data.actionType || ''}
              onChange={(e) => handleChange('actionType', e.target.value)}
            >
              <option value="">Select an action...</option>
              {automations.map((auto) => (
                <option key={auto.id} value={auto.label}>
                  {auto.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};
