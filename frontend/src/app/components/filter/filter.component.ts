import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  showDropdown = false;
  searchTermControl = new FormControl(''); 
  minPriceControl = new FormControl('');
  maxPriceControl = new FormControl('');
  categoryControl = new FormControl('');

  @Output() search = new EventEmitter<any>();

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onSearch(): void {
    const filters = {
      search : this.searchTermControl.value || '',
      minPrice : this.minPriceControl.value || null,
      maxPrice : this.maxPriceControl.value || null,
      category : this.categoryControl.value || ''
    };
    this.search.emit(filters); 
    this.showDropdown = false;
  }

  onEnter(event : KeyboardEvent) : void {
    if(event.key == 'Enter'){
      this.onSearch();
    }

  }
}
