import { Component, Input, OnInit } from '@angular/core';
import { InputNode } from '../models/graph.model';
import { NodeComponent } from '../node/node.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgxGraphModule} from '@swimlane/ngx-graph'

@Component({
  selector: 'app-workflow-tree',
  standalone: true,
  imports: [NodeComponent, CommonModule, FontAwesomeModule, NgxGraphModule ],
  templateUrl: './workflow-tree.component.html',
  styleUrl: './workflow-tree.component.css'
})
export class WorkflowTreeComponent implements OnInit {
  @Input() data: any = [];
  nodes: any = [];
  edges: any = [];

  ngOnInit() {
    const { nodes, edges } = this.convertToNodesAndEdges(this.data)
    this.nodes = nodes;
    this.edges = edges;
  }

  convertToNodesAndEdges(data: any): { nodes: any[], edges: any[] } {
    const nodesMap: any = {};
    const edges: any = [];

    // Recursive function to traverse the nested data
    function traverse(item: InputNode) {
      const id = String(item.task.workflowTaskID);
      let customColor = '';
      let customBorder = '';
  
      if(item.task.status === "Completed") {
        customColor = "#0d6efd";
        customBorder = "#084298";
      }
      
      if(item.task.status === "In-Progress") {
        customColor = "#198754";
        customBorder = "#0f5132"
      }
      
      if(item.task.status === "At Risk") {
        customColor = "#ffc107";
        customBorder = "#997404";
      }
      
      if(item.task.status === "New") {
        customColor = "#0dcaf0";
        customBorder = "#087990"
      }

      if(item.task.status === "Past Due") {
        customColor = "#dc3545";
        customBorder = "#842029";
      }
      const node = {
        id: id,
        label: item.task.teamName,
        dimension: {width: 300, height: 50},
        data: { customColor: customColor, customBorder: customBorder}
      };
      nodesMap[id] = node;

      item.children.forEach(child => {
        const childId = String(child.task.workflowTaskID);
        edges.push({ source: id, target: childId });
        traverse(child);
      });
    }

    data.forEach((item: any) => traverse(item));

    const nodes = Object.values(nodesMap);

    return { nodes, edges };
  }
}