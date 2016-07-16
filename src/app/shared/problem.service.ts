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

  getProblem(id: number): Observable<Problem> {
    // TODO: see what is returned when the id does not exist. hopefully null (see ProblemComponent.ngOnInit).
    return this.af.database.object(`/problems/${id}`);
  }

  getTopProblems(numProblems: number): Observable<Problem[]> {
    // TODO: consider calling `af.database.list` everytime
    return this.problems.take(numProblems);
  }
}
