import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store';
import { simulateWorkflow } from '../api';

export const SandboxTerminal = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const endOfLogsRef = useRef(null);

  const handleRun = async () => {
    setIsRunning(true);
    setIsExpanded(true);
    setLogs(['> Initializing workflow simulation...']);
    
    try {
      const resultLogs = await simulateWorkflow(nodes, edges);
      // Simulate sequential logging effect
      for (let i = 0; i < resultLogs.length; i++) {
        await new Promise(r => setTimeout(r, 400));
        setLogs(prev => [...prev, resultLogs[i]]);
      }
    } catch (error) {
      setLogs(prev => [...prev, `<error> ${error.message}`]);
    } finally {
      setIsRunning(false);
    }
  };

  const handleClear = () => {
    setLogs([]);
  };

  useEffect(() => {
    if (endOfLogsRef.current) {
      endOfLogsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isExpanded]);

  return (
    <div className={`absolute bottom-0 left-64 right-0 bg-slate-900 border-t border-slate-700 transition-all duration-300 ease-in-out z-40 ${isExpanded ? 'h-64' : 'h-12'}`}>
      {/* Header Bar */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-slate-800 bg-slate-950 text-slate-300">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 hover:text-white transition-colors"
        >
          <Terminal size={16} className="text-blue-400" />
          <span className="font-mono text-sm tracking-tight">Sandbox Terminal</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClear}
            disabled={logs.length === 0 || isRunning}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-50 transition-colors"
            title="Clear logs"
          >
            <RotateCcw size={14} />
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning || nodes.length === 0}
            className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold tracking-wider disabled:opacity-50 transition-colors"
          >
            <Play size={12} fill="currentColor" />
            {isRunning ? 'RUNNING...' : 'RUN'}
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div className={`p-4 font-mono text-sm overflow-y-auto ${isExpanded ? 'h-[calc(100%-3rem)]' : 'hidden'}`}>
        {logs.length === 0 ? (
          <div className="text-slate-600 italic h-full flex items-center justify-center">
            Click Run to simulate your workflow
          </div>
        ) : (
          <div className="space-y-1.5">
            {logs.map((log, index) => {
              const isError = log.includes('<error>');
              const isSuccess = log.includes('successfully');
              const isWarning = log.includes('Warning');
              
              return (
                <div 
                  key={index} 
                  className={`flex items-start gap-2 ${
                    isError ? 'text-red-400' : 
                    isSuccess ? 'text-emerald-400' : 
                    isWarning ? 'text-amber-400' : 'text-slate-300'
                  }`}
                >
                  <span className="opacity-50 mt-0.5">
                    {isError ? <AlertCircle size={14} /> : isSuccess ? <CheckCircle2 size={14} /> : '>'}
                  </span>
                  <span>{log.replace('<error> ', '')}</span>
                </div>
              );
            })}
            <div ref={endOfLogsRef} />
          </div>
        )}
      </div>
    </div>
  );
};
