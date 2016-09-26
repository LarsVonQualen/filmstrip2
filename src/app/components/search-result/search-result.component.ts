import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SearchResult } from '../../models';
import { CollectionService } from '../../services';

@Component({
  selector: 'fs-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: [
    './search-result.component.css'
  ]
})
export class SearchResultComponent {
  @Input() result: SearchResult;

  public isInCollection = new BehaviorSubject<boolean>(undefined);
  public addingToCollection = false;

  constructor(
    private collectionService: CollectionService
  ) {}

  public ngOnInit() {
    this.collectionService.getExistingMovie(this.result.imdbID)
      .subscribe(movie => {
        this.isInCollection.next(movie !== null);
      });
  }

  public onAddToCollection() {
    this.addingToCollection = true;

    this.collectionService
      .addToCollection(this.result.imdbID)
      .subscribe(() => {
        this.addingToCollection = false;
        this.isInCollection.next(true);
      });
  }
}
