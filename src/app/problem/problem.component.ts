import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CodeEditorComponent } from '../code-editor';
import { SubmissionModalComponent } from '../submission-modal';
import { AuthService, MarkdownPipe, Problem, ProblemService, Submission } from '../shared';

const DefaultSubmission: Submission = {
  lang: 'c',
  src: '',
  problem: undefined
};

@Component({
  moduleId: module.id,
  selector: 'app-problem',
  templateUrl: 'problem.component.html',
  styleUrls: ['problem.component.css'],
  directives: [
    CodeEditorComponent,
    SubmissionModalComponent
  ],
  pipes: [MarkdownPipe]
})
export class ProblemComponent implements OnInit {
  // Loaded from problemService on init
  problem: Problem;
  // Manipulated by editor. Set as a new object instance so as not to keep it in memory
  submission: Submission = {
    lang: DefaultSubmission.lang,
    src: DefaultSubmission.src,
    problem: DefaultSubmission.problem
  };
  // TODO: try ng2-bootstrap tabset again
  currentTab: Tab;

  @ViewChild('submissionModal') submissionModal: SubmissionModalComponent;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private problemService: ProblemService,
      private authService: AuthService) {}

  ngOnInit() {
    this.currentTab = Tab.Problem;
    this.route.params
        .subscribe(params => {
          let id = params['id'];
          // TODO: store current tab in the route data
          this.problemService.getProblem(id)
              .subscribe(problem => {
                // TODO: could use some more elegant validation that the problem exists
                if (problem.name) {
                  this.problem = problem;
                  this.submission.problem = problem.$key;
                  if (this.authService.auth) {
                    this.submission.submitterUid = this.authService.auth.uid;
                  }
                } else {
                  this.goToProblemsList();
                }
              });
        });
  }

  isCurrentTab(tab: string): boolean {
    return this.currentTab === Tab[tab];
  }

  goToProblemTab(): void {
    this.currentTab = Tab.Problem;
  }

  goToMySubmissionsTab(): void {
    this.currentTab = Tab.MySubmissions;
  }

  goToLeaderboardTab(): void {
    this.currentTab = Tab.Leaderboard;
  }

  goToProblemsList() {
    this.router.navigateByUrl('/problems');
  }

  submit(): void {
    this.submissionModal.handleSubmission(this.submission);
    // TODO: record submission data
  }

}

enum Tab {
  Problem,
  MySubmissions,
  Leaderboard
}
