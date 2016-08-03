import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire } from 'angularfire2';
import { MySubmission, Problem, SuccessfulSubmission, User } from '../';

@Injectable()
export class RepositoryService {
  constructor(private af: AngularFire) { }

  getUser(uid: string): Observable<User> {
    return uid
        ? this.af.database.object(`/users/${uid}`).map(
              snapshot => {
                return snapshot.$value !== null
                  ? snapshot as User
                  : null;
              })
        : null;
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

  getSubmissions(userId: string, problemId: string): Observable<MySubmission[]> {
    return this.af.database.list(`/submissions/${userId}/${problemId}`, {
      query: {
        orderByChild: 'submittedOn'
      }
    }).map(submissions => submissions.reverse());
  }

  getLeaderboard(problemId: string): Observable<SuccessfulSubmission[]> {
    return this.af.database.list(`/successfulSubmissions/${problemId}`, {
      query: {
        orderByChild: 'execTime',
        limitToLast: 10
      }
    });
  }
}
