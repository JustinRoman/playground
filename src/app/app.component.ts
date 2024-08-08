import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkflowTreeComponent } from './components/workflow-tree/workflow-tree.component';
import { dagData } from './components/mocks/graph.mock';
import { countries } from './components/mocks/countries.mock';
import { CommonModule } from '@angular/common';
import { SearchableDropdownComponent } from './components/searchable-dropdown/searchable-dropdown.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorkflowTreeComponent, CommonModule, SearchableDropdownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'playground';
  dagData = dagData;
  countries = countries;
  
  selectedItem: string | null = null;

  onSelectedItemChange(item: string): void {
    this.selectedItem = item;
  }
}
