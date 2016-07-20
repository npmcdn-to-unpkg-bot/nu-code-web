import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Submission } from './';

const Url = 'http://172.17.0.2:8080/api';
let headers = new Headers();
headers.append('Content-Type', 'application/json');

@Injectable()
export class SubmissionService {

  constructor(private http: Http) {}

  submit(submission: Submission): Observable<any> {
    const submissionJson = JSON.stringify(submission);
    return this.http.post(Url, submissionJson, {headers: headers});
  }

}
