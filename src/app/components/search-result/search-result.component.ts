import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SearchResult } from '../../models';
import { CollectionService, VoteService } from '../../services';

@Component({
  selector: 'fs-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: [
    './search-result.component.css'
  ]
})
export class SearchResultComponent {
  @Input() result: SearchResult;

  public likes: Observable<number>;

  public isInCollection = new BehaviorSubject<boolean>(undefined);
  public addingToCollection = false;

  constructor(
    private collectionService: CollectionService,
    private voteService: VoteService
  ) {}

  public ngOnInit() {
    this.collectionService.getExistingMovie(this.result.imdbID)
      .subscribe(movie => {
        this.isInCollection.next(movie !== null);
      });

    this.likes = this.voteService.getLikes(this.result.imdbID);
  }

  public onAddToCollection($event: Event) {
    $event.preventDefault();

    this.addingToCollection = true;

    this.collectionService
      .addToCollection(this.result.imdbID)
      .subscribe(() => {
        this.addingToCollection = false;
        this.isInCollection.next(true);
      });
  }

  public like($event) {
    $event.preventDefault();

    this.voteService.like(this.result.imdbID)
        .subscribe(() => {})
        .unsubscribe();
  }
}
