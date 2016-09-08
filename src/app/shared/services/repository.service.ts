import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
import { AngularFire } from 'angularfire2';

import { User } from '../models/user';

@Injectable()
export class RepositoryService {
  constructor(private af: AngularFire) { }

  getUser(uid: string): Observable<User> {
    return this.af.database.object(`/users/${uid}`).map(
        snapshot => snapshot.$value !== null
            ? snapshot as User
            : null);
  }
}
