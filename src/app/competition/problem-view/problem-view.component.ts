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

const DefaultSubmission: Submission = {
  lang: 'c',
  src: '',
  problem: undefined,
  competition: undefined
};

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
  // Manipulated by editor. Set as a new object instance so as not to change the const
  submission: Submission = {
    lang: DefaultSubmission.lang,
    src: DefaultSubmission.src,
    problem: DefaultSubmission.problem,
    competition: DefaultSubmission.competition
  };

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private repoService: RepositoryService,
      private authService: AuthService) { }

  ngOnInit() {
    let parentActivatedRoute = this.router.routerState.parent(this.route);
    parentActivatedRoute.params.subscribe(params => {
      let competitionId = params['id'];
      this.submission.competition = competitionId;
      this.route.params.subscribe(params => {
        let problemId = params['problemId'];
        this.submission.problem = problemId;
        this.repoService
            .getCompetitionProblem(competitionId, problemId)
            .subscribe(problem => this.problem = problem);
      });
    });
  }
}
