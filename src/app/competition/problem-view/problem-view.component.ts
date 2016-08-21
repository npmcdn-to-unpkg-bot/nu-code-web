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
  SubmissionTemplateService,
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
  pipes: [MarkdownPipe],
  providers: [SubmissionTemplateService]
})
export class ProblemViewComponent implements OnInit {
  problem: CompetitionProblem;
  submission: any = {};

  endedAlready: boolean = false;
  endedWhileWatching: boolean = false;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private repoService: RepositoryService,
      private authService: AuthService,
      private templateService: SubmissionTemplateService) { }

  ngOnInit() {
    // Load in the template
    this.templateService
        .getDefaultSubmission()
        .take(1)
        .subscribe(defaultSubmission => {
          this.submission.lang = defaultSubmission.lang;
          this.submission.src = defaultSubmission.src;
        });

    let parentActivatedRoute = this.router.routerState.parent(this.route);
    parentActivatedRoute.params.subscribe(params => {
      let competitionId = params['id'];
      this.submission.competition = competitionId;
      this.repoService
          .getCompetition(competitionId)
          .subscribe(competition => {
            let now = new Date();
            // Designate as finished or schedule the finish time.
            if (now < competition.endTime) {
              Observable.timer(competition.endTime).subscribe(() => {
                this.endedWhileWatching = true;
              });
            } else {
              this.endedAlready = true;
            }
          });
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
