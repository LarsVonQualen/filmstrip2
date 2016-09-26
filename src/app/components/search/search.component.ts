import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'fs-search',
  templateUrl: './search.component.html',
  styleUrls: [
    './search.component.css'
  ]
})
export class SearchComponent {
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  public searchQuery: string;

  constructor() {

  }

  search() {
    this.onSearch.next(this.searchQuery);
  }
}
