import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { OmdbService } from '../../services';
import { SearchResult } from '../../models';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'fs-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css'
  ]
})
export class HomeComponent implements OnInit {
  public onSearch = new Subject<string>();
  public results: Subject<SearchResult[]> = new Subject<SearchResult[]>();
  public totalResults = 0;
  public currentPage = 1;
  public canLoadMore: boolean;

  private currentSearchQuery: string;
  private lastResults: SearchResult[] = [];;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private omdb: OmdbService
  ) {

  }

  public ngOnInit() {
    this.onSearch.subscribe(query => this.doSearch(query));
    this.results.subscribe(results => {
      this.lastResults = results;
      this.canLoadMore = this.lastResults.length < this.totalResults;
    });

    this.route.params.subscribe(params => {
      if (params['searchQuery']) {
        this.initialSearch(params['searchQuery']);
      }
    });
  }

  public doSearch(query) {
    this.router.navigate(['/home', query]);
  }

  public initialSearch(query: string) {
    this.currentSearchQuery = query;
    this.currentPage = 1;

    this.search(query, 1)
        .subscribe(results => this.results.next(this.lastResults = results));
  }

  public changePage(page: number) {
    this.currentPage = page;

    this.search(this.currentSearchQuery, page)
        .subscribe(results => this.results.next(this.lastResults.concat(results)));
  }

  public nextPage() {
    this.changePage(this.currentPage + 1);
  }

  private search(query: string, page: number) {
    return this.omdb.search(query, page)
      .map(response => {
        this.totalResults = response.totalResults;

        return response.Search.map(result => {
          if (!result.Poster || result.Poster === 'N/A') {
            result.Poster = 'https://placehold.it/300x450';
          }

          return result;
        });
      });
  }
}
