import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import { User } from './';

const EmailPasswordConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@Injectable()
export class AuthService {
  ready: boolean = false;
  private _auth: FirebaseAuthState;
  private _user: User;

  constructor(private af: AngularFire) {
    af.auth.subscribe(
        auth => {
          console.log(auth);
          this._auth = auth;
          // `auth` only contains the `uid`: resolve the associated user
          if (auth) {
            this.getUser(auth.uid).subscribe(user => this._user = user);
          } else {
            this._user = null;
          }
          this.ready = true;
        });
  }

  get user(): User {
    return this._user;
  }

  get auth(): FirebaseAuthState {
    return this._auth;
  }

  getUser(uid: string): Observable<User> {
    return this.af.database.object(`/users/${uid}`);
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
