import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Result, Submission } from './';

const Url = 'http://172.17.0.2:8080/api';
let headers = new Headers();
headers.append('Content-Type', 'application/json');

@Injectable()
export class SubmissionService {
  constructor(private http: Http) {}

  submit(submission: Submission): Observable<Result> {
    return this.http
        .post(Url, submission, {headers: headers})
        .map(res => {
          return res.json() as Result;
        });
  }
}
