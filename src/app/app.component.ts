import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkflowTreeComponent } from './components/workflow-tree/workflow-tree.component';
import { dagData } from './components/mocks/graph.mock';
import { Country, countriesList } from './components/mocks/countries.mock';
import { CommonModule } from '@angular/common';
import { SearchableDropdownComponent } from './components/searchable-dropdown/searchable-dropdown.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorkflowTreeComponent, CommonModule, SearchableDropdownComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'playground';
  dagData = dagData;
  isDropdownDisabled = false;
  selectedItem: string | null = null;
  loginForm!: FormGroup;
  @Output() login: EventEmitter<any> = new EventEmitter();
  filters: string[] = ['First Name', 'Last Name', 'Date'];
  filterCheckboxesForm!: FormGroup;
  dynamicForm!: FormGroup;
  dynamicControls: { name: string, type: string }[] = [];
  checkedValues: { name: string, checked: boolean }[] = [];

  private readonly _countries: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);
  readonly countries$: Observable<Country[]> = this._countries.asObservable();

  get countries() { return this._countries.value }
  set countries(value: Country[]) { this._countries.next(value) }
  constructor(private formBuilder: FormBuilder) {}
  
  ngOnInit(): void {
    this.countries = countriesList;
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    const controls = this.filters.reduce((acc: any, item) => {
      acc[item] = [false]; // Initialize all controls as unchecked (false)
      return acc;
    }, {});

    this.filterCheckboxesForm = this.formBuilder.group(controls);
    this.dynamicForm = this.formBuilder.group({
      fields: this.formBuilder.array([])
    });

    this.filterCheckboxesForm.valueChanges.subscribe(() => {
      this.updateCheckedValues();
    });
  }

  updateCheckedValues() {
    // Create an array of objects with the format { name: 'go', checked: true }
    this.checkedValues = this.filters
      .filter(filter => this.filterCheckboxesForm.get(filter)?.value)  // Filter only checked items
      .map(item => ({ name: item, checked: true })); // Map to desired object format

    // Update dynamic form fields based on checked values
    this.createDynamicFields();
  }

  createDynamicFields() {
    const fieldsArray = this.dynamicForm.get('fields') as FormArray;
  
    // Track which items are already present in the dynamic form
    const existingControlNames = this.dynamicControls.map(control => control.name);
  
    // Add new controls for checked items that are not already present
    this.checkedValues.forEach(value => {
      if (!existingControlNames.includes(value.name)) {
        // Determine the type of control (e.g., text or date)
        let controlType = value.name === 'hi' ? 'date' : 'text';
        this.dynamicControls.push({ name: value.name, type: controlType });
  
        // Add a new form control
        fieldsArray.push(this.formBuilder.control(''));
      }
    });
  
    // Optionally keep or remove controls when unchecked (disabled logic here for preserving form controls)
  }
  
  getSelectedValues() {
    // Get selected values based on controls with a value of true (checked)
    const formValueArray = Object.keys(this.filterCheckboxesForm.value).map(key => ({
      name: key,
      checked: this.filterCheckboxesForm.value[key]
    }));
    console.log('Form Value as Array of Objects:', formValueArray);
  }

  onSelectedItemChange(item: any): void {
    this.selectedItem = item;
  }

  // Getter for easy access to dynamic form controls
  get dynamicFormControls() {
    return this.dynamicForm.get('fields') as FormArray;
  }

  getDynamicFormValues() {
    // Get the values of the dynamic form controls
    const fieldsArray = this.dynamicForm.get('fields') as FormArray;
    const values = fieldsArray.value;

    // Map values to the corresponding checked values for clarity
    const result = this.checkedValues.map((item, index) => ({
      name: item.name,
      value: values[index]
    }));

    console.log('Dynamic Form Values:', result);
    return result;
  }

  toggleDisable(): void {
    this.isDropdownDisabled = !this.isDropdownDisabled;
  }

  submit() {
    if(this.loginForm.valid) {
      this.login.emit(this.loginForm.value)
    }
  }
}
