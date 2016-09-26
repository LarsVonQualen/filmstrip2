import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFire, FirebaseAuthState, AngularFireAuth } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  private currentAuthState = new BehaviorSubject<FirebaseAuthState>(null);

  constructor(
    private af: AngularFire
  ) {
    af.auth.subscribe(authState => this.currentAuthState.next(authState));
  }

  public auth() {
    return this.getRawAuth()
      .filter(authState => authState !== null);
  }

  public getRawAuth() {
    return this.currentAuthState
      .asObservable();
  }

  public signIn(credentials: { email: string, password: string }) {
    return this.af.auth
      .login(credentials);
  }

  public createUser(credentials: { email: string, password: string }) {
    return this.af.auth
      .createUser(credentials);
  }

  public signOut() {
    this.af.auth.logout();
  }
}
