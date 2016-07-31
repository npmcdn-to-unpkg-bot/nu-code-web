import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire } from 'angularfire2';
import { Problem } from './';

@Injectable()
export class ProblemService {
  problem: Observable<Problem>;
  problems: Observable<Problem[]>;

  constructor(private af: AngularFire) {
    this.problems = af.database.list('/problems');
  }

  getProblem(id: string): Observable<Problem> {
    this.problem = this.af.database.object(`/problems/${id}`)
        .map(problemJson => Problem.fromJson(problemJson));
    return this.problem;
  }

  getTopProblems(numProblems: number): Observable<Problem[]> {
    // TODO: consider calling `af.database.list` everytime
    return this.problems.take(numProblems);
  }
}
