import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire } from 'angularfire2';
import { Problem, User } from './';

@Injectable()
export class RepositoryService {
  constructor(private af: AngularFire) { }

  getUser(uid: string): Observable<User> {
    return this.af.database.object(`/users/${uid}`);
  }

  getProblem(id: string): Observable<Problem> {
    return this.af.database.object(`/problems/${id}`)
        .map(problemJson => Problem.fromJson(problemJson));
  }

  getTopProblems(numProblems: number): Observable<Problem[]> {
    // TODO: consider calling `af.database.list` everytime
    return this.af.database.list('/problems')
        .take(numProblems);
  }
}
