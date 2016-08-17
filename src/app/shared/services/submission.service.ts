import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Result, Submission } from '../';

const Url = 'http://code.neumont.edu:3006/api';
const RequestHeaders = new Headers({
  'Content-Type': 'application/json'
});

@Injectable()
export class SubmissionService {
  constructor(private http: Http) {}

  submit(submission: Submission): Observable<Result> {
    return this.http
      .post(Url, submission, {headers: RequestHeaders})
      .map(res => {
        return res.json() as Result;
      });
  }
}
