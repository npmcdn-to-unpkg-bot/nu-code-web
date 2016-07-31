import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Problem, Submission } from '../../shared';

@Injectable()
export class SharingService {
  private _submission: Submission;
  public set submission(submission: Submission) {
    this._submission = submission;
    this._submissionSubject.next(submission);
  }
  public get submission(): Submission {
    return this._submission;
  }
  private _submissionSubject = new Subject<Submission>();
  public get submissionObservable(): Observable<Submission> {
    return this._submissionSubject.asObservable();
  }

  private _problem: Problem;
  public set problem(problem: Problem) {
    this._problem = problem;
    this._problemSubject.next(problem);
  }
  public get problem(): Problem {
    return this._problem;
  }
  private _problemSubject = new Subject<Problem>();
  public get problemObservable(): Observable<Problem> {
    return this._problemSubject.asObservable();
  }
}
