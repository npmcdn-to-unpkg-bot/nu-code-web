import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';

const EmailPasswordConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@Injectable()
export class AuthService {
  // TODO: This could be translated to a user through `uid`!
  private _auth: FirebaseAuthState;

  constructor(private af: AngularFire) {
    this.af.auth.subscribe(
      auth => {
        console.log(auth);
        this._auth = auth;
      });
  }

  get auth(): FirebaseAuthState {
    return this._auth;
  }

  // TODO: error handling

  signUpWithEmailPassword(email: string, password: string): void {
    this.af.auth.createUser({ email, password });
    // TODO: then log in?
  }

  logInWithEmailPassword(email: string, password: string): void {
    this.af.auth.login({ email, password }, EmailPasswordConfig);
  }

  logInWithFacebook(): void { }

  logInWithGoogle(): void { }

  logInWithGithub(): void { }

  logOut(): void {
    this.af.auth.logout();
  }
}
