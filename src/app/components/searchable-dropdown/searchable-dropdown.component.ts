import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-searchable-dropdown',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './searchable-dropdown.component.html',
  styleUrl: './searchable-dropdown.component.css'
})
export class SearchableDropdownComponent {
  @Input() items: any[] = [];
  @Input() pageSize: number = 10;
  @Output() selectedItemChange = new EventEmitter<any>();

  searchTerm: string = '';
  filteredItems: any[] = [];
  pageIndex: number = 0;
  paginatedItems: any[] = [];
  selectedValue: any | null = null;
  selectedDisplayValue: string = 'Select an item';
  dropdownOpen: boolean = false;

  ngOnInit(): void {
    this.filteredItems = this.items;
    this.paginateItems();
  }

  onSearchChange(searchTerm: string): void {
    this.pageIndex = 0;
    this.filteredItems = this.items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    this.paginateItems();
  }

  onPageChange(newPageIndex: number): void {
    if (newPageIndex >= 0 && newPageIndex * this.pageSize < this.filteredItems.length) {
      this.pageIndex = newPageIndex;
      this.paginateItems();
    }
  }

  onSelectionChange(value: any): void {
    this.selectedValue = value;
    this.selectedDisplayValue = value.name;
    this.selectedItemChange.emit(value);
    this.dropdownOpen = false;
  }

  private paginateItems(): void {
    this.paginatedItems = this.filteredItems.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  minPage(pageIndex: number, pageSize: number, filteredItemsLength: number) {
    return Math.min((pageIndex + 1) * pageSize, filteredItemsLength)
  }
}

