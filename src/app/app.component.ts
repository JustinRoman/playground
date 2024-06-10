import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkflowTreeComponent } from './components/workflow-tree/workflow-tree.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorkflowTreeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'playground';
}
