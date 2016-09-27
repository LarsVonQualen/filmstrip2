import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OmdbService, VoteService } from '../../services';
import { Movie, VoteRatios } from '../../models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'fs-movie',
  templateUrl: './movie.component.html',
  styleUrls: [
    './movie.component.css'
  ]
})
export class MovieComponent implements OnInit {
  public movie: Observable<Movie>;
  public likes: Observable<number>;

  constructor(
    private route: ActivatedRoute,
    private omdbService: OmdbService,
    private voteService: VoteService
  ) {

  }

  public ngOnInit() {
    this.movie = this.route.params
        .switchMap(params => this.omdbService.lookupById(params['movieId'], 'full'))
        .map((movie: Movie) => {
          if (!movie.Poster || movie.Poster === 'N/A') {
            movie.Poster = 'https://placehold.it/300x450';
          }

          console.log(movie);

          return movie;
        });

    this.likes = this.route.params
        .switchMap(params => this.voteService.getLikes(params['movieId']));
  }

  public like($event) {
    $event.preventDefault();

    this.route.params
        .switchMap(params => this.voteService.like(params['movieId']))
        .subscribe(() => {})
        .unsubscribe();
  }
}
