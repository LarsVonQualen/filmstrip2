import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SearchResult } from '../../models';

@Component({
  selector: 'fs-search-results',
  templateUrl: './search-results.component.html'
})
export class SearchResultsComponent {
  @Input() results: Observable<SearchResult[]>;
  @Output() onAddToCollection: EventEmitter<SearchResult> = new EventEmitter<SearchResult>();
}
