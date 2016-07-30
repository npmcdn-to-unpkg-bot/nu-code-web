import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire } from 'angularfire2';
import { User } from './';

@Injectable()
export class UserService {
  constructor(private af: AngularFire) { }

  getUser(uid: string): Observable<User> {
    return this.af.database.object(`/users/${uid}`);
  }

  createUser(uid: string, user: User): Promise<void> {
    const userList = this.af.database.object(`/users/${uid}`);
    return userList.set(user);
  }

  // /**
  //  * Matches based on the user's $key (uid).
  //  */
  // updateUser(user: User): Promise<void> {
  //   return this.af.database.object(`/users/${user.$key}`).set(user);
  // }
}
