import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Problem, Submission } from '../../shared';

@Injectable()
export class SharingService {
  private _submission = new Subject<Submission>();
  public set submission(submission: Submission) {
    this._submission.next(submission);
  }
  public get submissionObservable() : Observable<Submission> {
    return this._submission.asObservable();
  }

  private _problem: Problem;
  public set problem(problem: Problem) {
    this._problemSubject.next(problem);
    this._problem = problem;
  }
  public get problem(): Problem {
    return this._problem;
  }
  private _problemSubject = new Subject<Problem>();
  public get problemObservable(): Observable<Problem> {
    return this._problemSubject.asObservable();
  }
}
