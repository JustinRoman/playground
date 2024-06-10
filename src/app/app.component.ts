import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkflowTreeComponent } from './components/workflow-tree/workflow-tree.component';
import { dagData } from './components/mocks/graph.mock';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorkflowTreeComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'playground';
  dagData = dagData;
}
