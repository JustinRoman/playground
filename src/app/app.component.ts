import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkflowTreeComponent } from './components/workflow-tree/workflow-tree.component';
import { dagData } from './components/mocks/graph.mock';
import { Country, countriesList } from './components/mocks/countries.mock';
import { CommonModule } from '@angular/common';
import { SearchableDropdownComponent } from './components/searchable-dropdown/searchable-dropdown.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorkflowTreeComponent, CommonModule, SearchableDropdownComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'playground';
  dagData = dagData;
  isDropdownDisabled = false;
  selectedItem: string | null = null;
  
  private readonly _countries: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);
  readonly countries$: Observable<Country[]> = this._countries.asObservable();

  get countries() { return this._countries.value }
  set countries(value: Country[]) { this._countries.next(value) }

  ngOnInit(): void {
    this.countries = countriesList;
  }

  onSelectedItemChange(item: any): void {
    this.selectedItem = item;
  }

  toggleDisable(): void {
    this.isDropdownDisabled = !this.isDropdownDisabled;
  }
}
