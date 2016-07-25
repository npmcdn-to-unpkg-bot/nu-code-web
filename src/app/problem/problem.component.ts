import { Component, AfterViewChecked, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CatchSignature } from 'rxjs/operator/catch';
import { CodeEditorComponent } from '../code-editor';
import { SubmissionModalComponent } from '../submission-modal';
import { MarkdownPipe, Problem, ProblemService, Submission } from '../shared';

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
export class ProblemComponent implements OnInit, AfterViewChecked {
  problem: Problem;
  workingSubmission: Submission;
  currentTab: Tab;

  // TODO: try using viewchild to keep the editor in memory
  @ViewChild('editor') editor: CodeEditorComponent;
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
          // TODO: store tab in the route data
          this.problemService.getProblem(id)
              .subscribe(problem => {
                // TODO: could use some more elegant validation that the problem exists
                if (problem.name) {
                  this.problem = problem;
                } else {
                  this.goToProblemsList();
                }
              })
        });
  }

  ngAfterViewChecked() {
    // if (this.editor) {
      // this.editor.sourceCode = '#include <stdio.h>\nint main()\n{\n  printf("233168");\n}\n';
    // }
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
    const submission = {
      lang: this.editor.langId,
      src: this.editor.sourceCode,
      problem: this.problem.$key
    };
    this.submissionModal.handleSubmission(submission);
    // TODO: record submission data
  }

}

enum Tab {
  Problem,
  MySubmissions,
  Leaderboard
}
