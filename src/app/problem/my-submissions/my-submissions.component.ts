import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FaDirective } from 'angular2-fontawesome/directives';
import {
  AuthService,
  LangPipe,
  LoginModalService,
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
export class MySubmissionsComponent implements OnInit, OnDestroy {
  mySubmissions: MySubmission[];
  mySubmissionsSubscription: Subscription;

  constructor(
      private authService: AuthService,
      private loginModalService: LoginModalService,
      private sharingService: SharingService,
      private repoService: RepositoryService) { }

  ngOnInit() {
    // Do not try to load submissions until the user is logged in
    this.authService.user.subscribe(
        user => {
          if (user) {
            this.sharingService.problemObservable.subscribe(
                problem => {
                  if (problem) {
                    this.mySubmissionsSubscription = this.repoService
                        .getSubmissions(user.$key, problem.$key).subscribe(
                            submissions => this.mySubmissions = submissions);
                  }
                });
          } else {
            this.mySubmissions = [];
            this.killSubscription();
          }
        });
  }

  ngOnDestroy() {
    this.killSubscription();
  }

  killSubscription() {
    if (this.mySubmissionsSubscription) {
      this.mySubmissionsSubscription.unsubscribe();
    }
  }
}
