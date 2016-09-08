import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

import { User } from '../models/user';
import { RepositoryService } from './repository.service';

const newlyVerifiedUrl = 'http://code.neumont.edu/verified';
const requestHeaders = new Headers({
  'Content-Type': 'application/json'
});

const emailPasswordConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@Injectable()
export class AuthService {
  constructor(
      private router: Router,
      private http: Http,
      private af: AngularFire,
      private repoService: RepositoryService) { }

  /**
   * Listen for changes in auth state, through the `firebase.auth.Auth` interface.
   * https://firebase.google.com/docs/reference/js/firebase.auth.Auth
   */
  get auth(): Observable<firebase.User> {
    return this.af.auth.map(auth => auth ? auth.auth : null);
  }

  get loggedIn(): Observable<boolean> {
    return this.auth.map(auth => !!auth);
  }

  get verified(): Observable<boolean> {
    return this.auth.map(auth => auth && auth.emailVerified);
  }

  get user(): Observable<User> {
    return this.auth.flatMap<User>(auth => auth
        ? this.repoService.getUser(auth.uid)
        : Observable.of(null));
  }

  logInWithEmailPassword(email: string, password: string): Promise<void> {
    return this.af.auth.login({ email, password }, emailPasswordConfig);
  }

  logOut(): void {
    this.af.auth.logout();
    this.router.navigateByUrl('/');
  }
}
