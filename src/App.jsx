import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { ConfigPanel } from './components/ConfigPanel';
import { SandboxTerminal } from './components/SandboxTerminal';

function App() {
  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Top Header */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center px-6 shadow-sm z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            H
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">
            HR Workflow Designer
          </h1>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 relative overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 relative bg-slate-50">
          <Canvas />
          <ConfigPanel />
        </main>
        
        <SandboxTerminal />
      </div>
    </div>
  );
}

export default App;
