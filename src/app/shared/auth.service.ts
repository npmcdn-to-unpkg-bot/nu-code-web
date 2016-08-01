import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import { User } from './';
import { RepositoryService } from './repository.service';

const EmailPasswordConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@Injectable()
export class AuthService {
  get loggedIn(): boolean {
    return !this._user.value;
  }

  private _user = new BehaviorSubject<User>(null);
  public get user(): User {
    return this._user.value;
  }
  public get userObservable(): Observable<User> {
    return this._user.asObservable();
  }

  constructor(
      private af: AngularFire,
      private repoService: RepositoryService) {
    af.auth.subscribe(
        auth => {
          if (auth) {
            repoService.getUser(auth.uid).subscribe(
                user => this._user.next(user));
          } else {
            this._user.next(null);
          }
        });
  }

  /**
   * Resolves with the `uid` of the created user.
   */
  registerNewUser(user: User, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // First create the user in auth
      this.af.auth.createUser({ email: user.email, password: password }).then(
          authState => {
            // If that succeeded, create the user in the database
            let uid = authState.uid;
            this.af.database.object(`/users/${uid}`).set(user).then(
                () => resolve(),
                err => reject(err));
          },
          err => reject(err));
    });
  }

  logInWithEmailPassword(email: string, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.af.auth.login({ email, password }, EmailPasswordConfig).then(
          auth => resolve(),
          err => reject(err));
    });
  }

  logInWithFacebook(): void { }

  logInWithGoogle(): void { }

  logInWithGithub(): void { }

  logOut(): void {
    this.af.auth.logout();
  }
}
