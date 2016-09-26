import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OmdbService } from '../../services';
import { Movie } from '../../models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'fs-movie',
  templateUrl: './movie.component.html',
  styleUrls: [
    './movie.component.css'
  ]
})
export class MovieComponent implements OnInit {
  public movie: Movie;

  constructor(
    private route: ActivatedRoute,
    private omdb: OmdbService
  ) {

  }

  public ngOnInit() {
    this.omdb
        .lookupById(this.route.snapshot.params['movieId'], 'full')
        .map(movie => {
          if (!movie.Poster || movie.Poster === 'N/A') {
            movie.Poster = 'https://placehold.it/300x450';
          }

          return movie;
        })
        .subscribe(movie => this.movie = movie);
  }
}
