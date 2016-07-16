import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Problem } from '../shared/problem';

@Injectable()
export class ProblemService {
  problems: FirebaseListObservable<Problem[]>;

  constructor(private af: AngularFire) {
    this.problems = af.database.list('/problems');
  }

  getTopProblems(numProblems: number): Observable<Problem[]> {
    return this.problems.take(numProblems);
  }
}
