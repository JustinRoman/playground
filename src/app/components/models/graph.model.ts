// export interface Node {
//     task:   WorkflowTask;
//     children: Node[];
// }

// export interface WorkflowTask {
//     workflowTaskID: number;
//     workflowName:   string;
//     teamName:       string;
//     predecessorIDs: number[];
// }

export interface Task {
    workflowTaskID: number;
    workflowName: string;
    teamName: string;
    status: string;
    predecessorIDs: number[];
  }
  
  export interface Node {
    id: string;
    teamName: string;
  }
  
  export interface Edge {
    parent: string;
    child: string;
  }
  
  export interface InputNode {
    task: Task;
    children: InputNode[];
  }