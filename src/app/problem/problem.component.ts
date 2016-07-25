import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CatchSignature } from 'rxjs/operator/catch';
import { CodeEditorComponent } from '../code-editor';
import { SubmissionModalComponent } from '../submission-modal';
import { MarkdownPipe, Problem, ProblemService, Result, Submission } from '../shared';

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
// TODO: Solution disappears when switching tabs
export class ProblemComponent implements OnInit {
  // Loaded from problemService on init
  problem: Problem;
  // Manipulated by editor, it eventually adheres to the Submission interface
  submission = DefaultSubmission;
  // Manipulated by submissionModal
  lastResult: Result;
  // TODO: try ng2-bootstrap tabset again
  currentTab: Tab;

  @ViewChild('submissionModal') submissionModal: SubmissionModalComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private problemService: ProblemService) {}

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
                } else {
                  this.goToProblemsList();
                }
              })
        });
  }

  isCurrentTab(tab: string): boolean {
    return this.currentTab == Tab[tab];
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
    this.router.navigate(['/problems']);
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
