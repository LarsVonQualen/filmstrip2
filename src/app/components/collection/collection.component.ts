import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, Subject, Observer } from 'rxjs';
import * as _ from 'lodash';

import { CollectionService, VoteService } from '../../services';
import { Movie } from '../../models';

interface Sort {
  key: string;
  order: string;
}

@Component({
  selector: 'fs-collection',
  templateUrl: './collection.component.html',
  styleUrls: [
    './collection.component.css'
  ]
})
export class CollectionComponent implements OnInit {
  public collection: Observable<Movie[]>;
  public sortKey: BehaviorSubject<string> = new BehaviorSubject<string>('Title');
  public sortOrder: BehaviorSubject<string> = new BehaviorSubject<string>('ascending');
  public likes: Observable<{ [key: string]: Observable<number> }> = new Observable<{ [key: string]: Observable<number> }>();

  constructor(
    private collectionService: CollectionService,
    private router: Router,
    private voteService: VoteService
  ) {}

  public ngOnInit() {
    const sorting = Observable.create((observer: Observer<Sort>) => {
      let lastSortKey: string;
      let lastSortOrder: string;

      const next = (key, order) => observer.next({
        key: key,
        order: order
      });

      this.sortKey
          .do(key => lastSortKey = key)
          .subscribe(key => next(key, lastSortOrder || 'ascending'));

      this.sortOrder
          .do(order => lastSortOrder = order)
          .subscribe(order => next(lastSortKey || 'Title', order));
    });

    this.collection = sorting
        .switchMap(sorting => this.collectionService.getCollection()
          .map(collection => this.applySorting(sorting, collection)));

    this.likes = this.collection.map(movies => movies.reduce((prev, curr) => {
      prev[curr.imdbID] = this.voteService.getLikes(curr.imdbID);

      return prev;
    }, {}));
  }

  public navigateTo(imdbID) {
    this.router.navigate(['/movies', imdbID]);
  }

  public sortBy($event: Event, key: string) {
    $event.preventDefault();

    this.sortKey.next(key);
  }

  public clearSorting($event: Event) {
    $event.preventDefault();

    this.sortKey.next('Title');
  }

  public setOrder($event: Event, order: 'ascending' | 'descending') {
    $event.preventDefault();

    this.sortOrder.next(order);
  }

  private applySorting(sorting: Sort, movies: Movie[]): Movie[] {
    if (movies.length && isFinite(movies[0][sorting.key])) {
      movies = movies.map(movie => {
        movie[sorting.key] = +movie[sorting.key];

        return movie;
      });
    }

    const result = _.sortBy(movies, sorting.key);

    if (sorting.order === 'descending') {
      return _.reverse(result);
    }

    return result;
  }
}
