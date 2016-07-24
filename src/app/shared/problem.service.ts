import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Problem } from './';

@Injectable()
export class ProblemService {
  problems: FirebaseListObservable<Problem[]>;

  constructor(private af: AngularFire) {
    this.problems = af.database.list('/problems');
  }

  getProblem(id: string): Observable<Problem> {
    return this.af.database.object(`/problems/${id}`)
        .map(problemJson => Problem.fromJson(problemJson));
  }

  getTopProblems(numProblems: number): Observable<Problem[]> {
    // TODO: consider calling `af.database.list` everytime
    return this.problems.take(numProblems);
  }
}
