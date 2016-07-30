import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import { User } from './';
import { UserService } from './user.service';

const EmailPasswordConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@Injectable()
export class AuthService {
  private _auth: FirebaseAuthState;
  private _user: User;

  constructor(
      private af: AngularFire,
      private userService: UserService) {
    af.auth.subscribe(
        auth => {
          console.log(auth);
          this._auth = auth;
          // `auth` only contains the `uid`: resolve the associated user
          if (auth) {
            this.userService.getUser(auth.uid)
              .subscribe(user => this._user = user);
          } else {
            this._user = null;
          }
        });
  }

  get user(): User {
    return this._user;
  }

  get auth(): FirebaseAuthState {
    return this._auth;
  }

  // TODO: error handling

  signUpWithEmailPassword(email: string, password: string): void {
    this.af.auth.createUser({ email, password });
    // TODO: then log in?
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
