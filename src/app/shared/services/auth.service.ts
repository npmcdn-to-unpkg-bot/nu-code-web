import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { User } from '../';
import { RepositoryService } from './repository.service';

const NewlyVerifiedUrl = 'http://code.neumont.edu/verified';
const RequestHeaders = new Headers({
  'Content-Type': 'application/json'
});

const EmailPasswordConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@Injectable()
export class AuthService {
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

  get isNeumonter(): Observable<boolean> {
    return this.auth.map(auth => {
      let isNeumonter = false;
      if (auth) {
        let isVerified = auth.emailVerified;
        let hasNeumontEmail = auth.email.endsWith('neumont.edu');
        isNeumonter = isVerified && hasNeumontEmail;
      }
      return isNeumonter;
    });
  }

  get isFaculty(): Observable<boolean> {
    return this.auth.map(auth => {
      let isFaculty = false;
      if (auth) {
        let isVerified = auth.emailVerified;
        let hasFacultyEmail = auth.email.endsWith('@neumont.edu');
        isFaculty = isVerified && hasFacultyEmail;
      }
      return isFaculty;
    });
  }

  get user(): Observable<User> {
    return this.auth.flatMap(auth => auth
        ? this.repoService.getUser(auth.uid)
        : Observable.of(null));
  }

  get token(): Observable<string> {
    return this.auth.flatMap(auth => {
      let promise: Promise<string> = auth ? auth.getToken(true) : Promise.resolve(null);
      return Observable.fromPromise(promise);
    });
  }

  constructor(
      private router: Router,
      private http: Http,
      private af: AngularFire,
      private repoService: RepositoryService) { }

  /**
   * Resolves with the `uid` of the created user.
   */
  registerNewUser(user: User, password: string, picture?: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      // First create the user in auth
      this.af.auth.createUser({ email: user.email, password: password }).then(
          authState => {
            // Send email verification once logged in
            authState.auth.sendEmailVerification();
            // If creation succeeded, create the user in the database
            let uid = authState.uid;
            // Create the profile picture if provided
            let storePicture = new Promise(resolve => {
              if (picture) {
                this.repoService.storeImage(`profile-pictures/${uid}`, picture).then(url => {
                  user.imgUrl = url;
                  resolve();
                });
              } else {
                resolve();
              }
            });
            storePicture.then(() => {
              this.af.database.object(`/users/${uid}`).set(user).then(
                  () => resolve(uid),
                  err => reject(err));
            });
          },
          err => reject(err));
    });
  }

  sendVerificationEmail(): Promise<void> {
    return this.auth.take(1).toPromise().then(auth => auth
        ? auth.sendEmailVerification()
        : Promise.reject('User is not logged in!'));
  }

  verifyEmail(oobCode: string): Promise<void> {
    return firebase.auth().applyActionCode(oobCode).then(
      () => Promise.all([
              this.notifyNewlyVerified(),
              firebase.auth().currentUser.reload()
            ]),
      err => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  private notifyNewlyVerified(): Promise<void> {
    return this.token.take(1).toPromise().then(token => token
        ? this.http
              .post(NewlyVerifiedUrl, { token }, RequestHeaders)
              .map(res => {})
              .toPromise()
        : Promise.resolve(null));
  }

  sendPasswordResetEmail(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  /**
   * Resolves with the email associated with `oobCode`.
   */
  verifyPasswordResetCode(oobCode: string): Promise<string> {
    return firebase.auth().verifyPasswordResetCode(oobCode);
  }

  confirmPasswordReset(oobCode: string, newPassword: string): Promise<void> {
    return firebase.auth().confirmPasswordReset(oobCode, newPassword);;
  }

  logInWithEmailPassword(email: string, password: string): Promise<void> {
    return this.af.auth.login({ email, password }, EmailPasswordConfig);
  }

  logInWithFacebook(): void { }

  logInWithGoogle(): void { }

  logInWithGithub(): void { }

  logOut(): void {
    this.af.auth.logout();
    this.router.navigateByUrl('/');
  }
}
