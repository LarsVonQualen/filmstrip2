import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { UserService } from './user.service';

import { VoteRatios } from '../models';

@Injectable()
export class VoteService {
  constructor(
    private af: AngularFire,
    private userService: UserService
  ) {}

  public likes(key: string) {
    return this.userService
      .auth()
      .switchMap(authState => this.af.database
          .object(this.getUserSpecificLikesUrl(authState, key))
          .do(vote => console.log(vote))
          .map(vote => vote === null));
  }

  public like(key: string) {
    return this.userService
        .auth()
        .switchMap(authState => {
          const sub = new Subject();

          this.af.database
              .object(this.getLikesUrl(key))
              .update({ [authState.auth.uid]: true })
              .then(() => sub.next())
              .catch(err => sub.error(err));

          return sub.asObservable();
        });
  }

  public getLikes(key: string): Observable<number> {
    return this.af.database
      .list(this.getLikesUrl(key))
      .map(likes => Object.keys(likes).length);
  }


  private getUserSpecificLikesUrl(authState: { auth: { uid: string }}, key: string) {
    return `${this.getLikesUrl(key)}/${authState.auth.uid}`;
  }

  private getLikesUrl(key: string) {
    return `${this.getUrl(key)}`;
  }

  private getUrl(key: string) {
    return `/votes/${key}`;
  }
}
