import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { getNestedProperty } from '../../shared/utils/utils';
interface DropdownItem {
  [key: string]: any; // Allows dynamic properties
}
@Component({
  selector: 'app-searchable-dropdown',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './searchable-dropdown.component.html',
  styleUrls: ['./searchable-dropdown.component.css']
})
export class SearchableDropdownComponent implements OnDestroy {
  @Input('dropdownItems') items$!: Observable<DropdownItem[]>; // alias 'dropdownItems' for parent
  @Input() pageSize: number = 10;
  @Input() displayProperty: string = 'name'; // property to display, can be nested
  @Input() defaultValue: DropdownItem | DropdownItem[] | null = null; // default value(s)
  @Input() isMultiSelect: boolean = false; // enable multi-select
  @Input() isDisabled: boolean = false; // disable dropdown
  @Output('dropdownSelectionChange') selectedItemChange = new EventEmitter<DropdownItem | DropdownItem[]>();

  items: DropdownItem[] = [];
  searchTerm: string = '';
  filteredItems: DropdownItem[] = [];
  pageIndex: number = 0;
  paginatedItems: DropdownItem[] = [];
  selectedValue: DropdownItem | DropdownItem[] | null = null;
  selectedDisplayValue: string = 'Select an item';
  dropdownOpen: boolean = false;

  private subscription!: Subscription;

  getNestedProperty = getNestedProperty;

  constructor(private eRef: ElementRef){}

  ngOnInit(): void {
    this.subscription = this.items$.subscribe(data => {
      this.items = data;
      this.sortItems();
      this.filteredItems = this.items;
      this.paginateItems();
      if (this.defaultValue) {
        this.setDefaultValue(this.defaultValue);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }

  onSearchChange(searchTerm: string): void {
    if (this.isDisabled) return; // Prevent search if disabled
    this.pageIndex = 0;
    this.filteredItems = this.items.filter(item => {
      const value = getNestedProperty(item, this.displayProperty);
      return value ? value.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    });
    this.paginateItems();
  }

  onPageChange(newPageIndex: number): void {
    if (this.isDisabled) return;
    if (newPageIndex >= 0 && newPageIndex * this.pageSize < this.filteredItems.length) {
      this.pageIndex = newPageIndex;
      this.paginateItems();
    }
  }

  onSelectionChange(value: DropdownItem): void {
    if (this.isDisabled) return; 
    if (this.isMultiSelect) {
      if (!this.selectedValue) {
        this.selectedValue = [];
      }
      const index = (this.selectedValue as DropdownItem[]).indexOf(value);
      if (index === -1) {
        (this.selectedValue as DropdownItem[]).push(value);
      } else {
        (this.selectedValue as DropdownItem[]).splice(index, 1);
      }
      this.selectedDisplayValue = (this.selectedValue as DropdownItem[])
        .map(item => getNestedProperty(item, this.displayProperty))
        .join(', ');
    } else {
      this.selectedValue = value;
      this.selectedDisplayValue = getNestedProperty(value, this.displayProperty);
      this.dropdownOpen = false;
    }
    this.selectedItemChange.emit(this.selectedValue);
  }

  private paginateItems(): void {
    this.paginatedItems = this.filteredItems.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }
  
  toggleDropdown(): void {
    if (this.isDisabled) return;
    this.dropdownOpen = !this.dropdownOpen;
  }

  minPage(pageIndex: number, pageSize: number, filteredItemsLength: number) {
    return Math.min((pageIndex + 1) * pageSize, filteredItemsLength)
  }

  isSelected(item: DropdownItem): boolean {
    if (this.isMultiSelect && Array.isArray(this.selectedValue)) {
      return this.selectedValue.includes(item);
    }
    return this.selectedValue === item;
  }

  private setDefaultValue(value: DropdownItem | DropdownItem[]): void {
    this.selectedValue = value;
    if (this.isMultiSelect) {
      this.selectedDisplayValue = (value as DropdownItem[])
        .map(item => getNestedProperty(item, this.displayProperty))
        .join(', ');
    } else {
      this.selectedDisplayValue = getNestedProperty(value as DropdownItem, this.displayProperty);
    }
    this.selectedItemChange.emit(this.selectedValue);
  }

  private sortItems(): void {
    this.items.sort((a, b) => {
      const aValue = getNestedProperty(a, this.displayProperty).toString().toLowerCase();
      const bValue = getNestedProperty(b, this.displayProperty).toString().toLowerCase();

      if (!isNaN(Number(aValue)) && !isNaN(Number(bValue))) {
        return Number(aValue) - Number(bValue);
      } else if (!isNaN(Number(aValue))) {
        return -1;
      } else if (!isNaN(Number(bValue))) {
        return 1;
      } else {
        return aValue.localeCompare(bValue);
      }
    });
  }
}

