import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { FaDirective } from 'angular2-fontawesome/directives';
import {
  AuthService,
  LangPipe,
  MySubmission,
  PrecisionPipe,
  RepositoryService,
  SpacifyPipe
} from '../../shared';
import { SharingService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-my-submissions',
  templateUrl: 'my-submissions.component.html',
  styleUrls: ['my-submissions.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    FaDirective
  ],
  pipes: [
    LangPipe,
    PrecisionPipe,
    SpacifyPipe
  ]
})
export class MySubmissionsComponent implements OnInit {
  mySubmissions: MySubmission[];

  constructor(
      private af: AngularFire,
      private authService: AuthService,
      private sharingService: SharingService,
      private repoService: RepositoryService) { }

  ngOnInit() {
    // if (this.authService.auth) {
    this.af.auth.subscribe(
        auth => {
          if (auth) {
            if (this.sharingService.problem) {
              this.initMySubmissions(this.sharingService.problem.$key);
            } else {
              this.sharingService.problemObservable.subscribe(
                  problem => this.initMySubmissions(problem.$key));
            }
          }
        });
  }

  initMySubmissions(problemId: string) {
    this.repoService.getSubmissions(this.authService.auth.uid, problemId).subscribe(
        submissions => this.mySubmissions = submissions);
  }
}
