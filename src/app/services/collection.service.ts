import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { UserService } from './user.service';
import { OmdbService } from './omdb.service';
import { Movie } from '../models';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CollectionService {
  constructor(
    private af: AngularFire,
    private userService: UserService,
    private omdbService: OmdbService
  ) {

  }

  public getCollection() {
    return this.userService
      .auth()
      .switchMap(authState => this.af.database.list(this.getBaseUrl(authState)))
      .catch(err => Observable.from([]));
  }

  public addToCollection(key: string) {
    return this.userService
      .auth()
      .switchMap(authState => {
        const subject = new Subject<Movie>();

        this.omdbService
            .lookupById(key)
            .subscribe(movie => {
              this.af.database
                .object(this.getSpecificMovieUrl(authState, movie.imdbID))
                .update(movie)
                .then(() => subject.next(movie))
                .catch(err => subject.error(err));
            });

        return subject;
      });
  }

  public removeFromCollection(key: string) {
    return this.userService
      .auth()
      .switchMap(authState => {
        const subject = new Subject<Movie>();

        this.af.database
          .object(this.getSpecificMovieUrl(authState, key))
          .remove()
          .then(() => subject.complete())
          .catch(err => subject.error(err));

        return subject;
      });
  }

  public getExistingMovie(key: string) {
    return this.userService
      .auth()
      .switchMap(authState => this.af.database.object(this.getSpecificMovieUrl(authState, key)))
      .map(movieRef => movieRef.$exists() ? movieRef.$value : null);
  }

  private getBaseUrl(authState: { auth: { uid: string }}) {
    return `/collections/${authState.auth.uid}`;
  }

  private getSpecificMovieUrl(authState: { auth: { uid: string }}, key: string) {
    return `${this.getBaseUrl(authState)}/${key}`;
  }
}
