import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Movie, SearchResultResponse } from '../models';

export type OmdbType = 'movie' | 'series' | 'episode' | 'game';

interface IBaseUrl {
  /**
   * Type of result to return.
   */
  type?: OmdbType;
  /**
   * Year of release.
   */
  y?: string;
  /**
   * The data type to return.
   */
  r?: 'json' | 'xml';
}

interface ISearchUrl extends IBaseUrl {
  /**
   * Movie title to search for.
   */
  s: string;
  /**
   * Page number to return.
   *
   * Valid options: 1-100
   */
  page?: number;
}

interface ILookupUrl extends IBaseUrl {
  /**
   * A valid IMDb ID (e.g. tt1285016)
   */
  i?: string;
  /**
   * Movie title to search for.
   */
  t?: string;
  /**
   * Return short or full plot.
   */
  plot?: 'short' | 'full';
  /**
   * Include Rotten Tomatoes ratings.
   */
  tomatoes?: 'true' | 'false';
}

@Injectable()
export class OmdbService {
  private BASE_URL = 'https://www.omdbapi.com/?';

  constructor(
    private http: Http
  ) {}

  public search(query: string, page?: number): Observable<SearchResultResponse> {
    if (isFinite(page) && page < 1 && page > 100) {
      throw new Error(`'page' parameter must be between 1 and 100.`);
    }

    const searchQuery: ISearchUrl = {
      s: query,
      page: page,
      r: 'json'
    };

    return this.http
      .get(this.buildUrl(searchQuery))
      .map(response => response.json());
  }

  public lookupById(id: string, plot: 'short' | 'full' = 'short'): Observable<Movie> {
    const lookupQuery: ILookupUrl = {
      i: id,
      r: 'json',
      tomatoes: 'true',
      plot: plot
    };

    return this.http
      .get(this.buildUrl(lookupQuery))
      .map(response => response.json());
  }

  public lookupByTitle(title: string, plot: 'short' | 'full' = 'short'): Observable<Movie> {
    const lookupQuery: ILookupUrl = {
      t: title,
      r: 'json',
      tomatoes: 'true',
      plot: plot
    };

    return this.http
      .get(this.buildUrl(lookupQuery))
      .map(response => response.json());
  }

  private buildUrl(query: ILookupUrl | ISearchUrl) {
    return `${this.BASE_URL}${this.buildQueryString(query)}`;
  }

  private buildQueryString(query: ILookupUrl | ISearchUrl): string {
    return Object.keys(query).map((key) => {
      if (query[key]) {
        return `${key}=${query[key]}`;
      }

      return '';
    }).join('&');
  }
}
