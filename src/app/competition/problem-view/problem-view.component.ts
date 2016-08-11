import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { FaDirective } from 'angular2-fontawesome/directives';
import { CodeEditorComponent } from '../../code-editor';
import { SubmissionModalComponent } from '../../submission-modal';
import {
  AuthService,
  CompetitionProblem,
  MarkdownPipe,
  RepositoryService,
  Submission,
  User
} from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-problem-view',
  templateUrl: 'problem-view.component.html',
  styleUrls: ['problem-view.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    FaDirective,
    CodeEditorComponent,
    SubmissionModalComponent
  ],
  pipes: [MarkdownPipe]
})
export class ProblemViewComponent implements OnInit {
  problem: CompetitionProblem;
  submission: Submission;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private repoService: RepositoryService,
      private authService: AuthService) { }

  ngOnInit() {
    let problemId = this.route.snapshot.params['id'];
    console.log(problemId);
    // this.repoService.getCompetitionProblem()
  }
}
