// Mock API interactions

export const fetchAutomations = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'email', label: 'Send Email' },
        { id: 'slack', label: 'Slack Ping' },
        { id: 'doc', label: 'Generate Doc' },
        { id: 'webhook', label: 'Trigger Webhook' }
      ]);
    }, 500);
  });
};

export const simulateWorkflow = (nodes, edges) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const logs = [];
      const startNode = nodes.find((n) => n.type === 'startNode');
      
      if (!startNode) {
        reject(new Error("Error: No Start Node found. Workflow cannot begin."));
        return;
      }

      let currentNode = startNode;
      let stepCount = 1;

      while (currentNode) {
        const typeLabel = currentNode.type.replace('Node', '').toUpperCase();
        let detail = currentNode.data.title || 'Untitled Node';
        
        if (currentNode.type === 'taskNode' && currentNode.data.assignee) {
          detail += ` (Assignee: ${currentNode.data.assignee})`;
        } else if (currentNode.type === 'approvalNode' && currentNode.data.approverRole) {
          detail += ` (Approver: ${currentNode.data.approverRole})`;
        } else if (currentNode.type === 'automatedNode' && currentNode.data.actionType) {
          detail += ` (Action: ${currentNode.data.actionType})`;
        }

        logs.push(`> Step ${stepCount}: Executed [${typeLabel}] - ${detail}`);
        stepCount++;

        // Find next connected node
        const outgoingEdge = edges.find((e) => e.source === currentNode.id);
        if (outgoingEdge) {
          currentNode = nodes.find((n) => n.id === outgoingEdge.target);
        } else {
          // If the last node is not an endNode, maybe add a warning log?
          if (currentNode.type !== 'endNode') {
            logs.push(`> Warning: Workflow ended without an End Node.`);
          } else {
            logs.push(`> Workflow completed successfully.`);
          }
          currentNode = null;
        }
      }

      resolve(logs);
    }, 1000);
  });
};
