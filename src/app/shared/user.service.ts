import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { User } from './';

@Injectable()
export class UserService {
  constructor(private af: AngularFire) {}

  getUser(uid: string): Observable<User> {
    return this.af.database.object(`/users/${uid}`);
  }
}
