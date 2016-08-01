import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
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
      private authService: AuthService,
      private sharingService: SharingService,
      private repoService: RepositoryService) { }

  ngOnInit() {
    // Do not try to load submissions until the user is logged in
    this.authService.user.subscribe(
        user => {
          if (user) {
            this.initMySubmissions(user.$key, this.sharingService.problem.$key);
          } else {
            this.mySubmissions = [];
          }
        }
    );
  }

  initMySubmissions(userId: string, problemId: string) {
    this.repoService.getSubmissions(userId, problemId).subscribe(
        submissions => this.mySubmissions = submissions);
  }
}
