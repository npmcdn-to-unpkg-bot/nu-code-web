import { Component, AfterViewChecked, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CatchSignature } from 'rxjs/operator/catch';
import { CodeEditorComponent } from '../code-editor';
import { SubmissionModalComponent } from '../submission-modal';
import { MarkdownPipe, Problem, ProblemService } from '../shared';

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
export class ProblemComponent implements OnInit, AfterViewChecked, OnDestroy {
  // problem: Problem;
  problem: any;
  currentTab: Tab;

  // A connection opened in ngOnInit(), closed in ngOnDestroy()
  private problemSubscription: Subscription;

  @ViewChild('editor') editor: CodeEditorComponent;
  @ViewChild('submissionModal') submissionModal: SubmissionModalComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private problemService: ProblemService) {}

  ngOnInit() {
    this.currentTab = Tab.Problem;
    this.problemSubscription = this.route
        .params
        .subscribe(params => {
          let id = params['id'];
          // TODO: grab which tab from route data
          this.problemService.getProblem(id)
            .subscribe(problem => {
              // TODO: could use some more elegant validation that the problem exists
              if (problem.name) {
                this.problem = problem;
                // TODO: see if you can query from firebase to not escape \n
                this.problem.description = this.problem.description.replace(/\\n/g, '\n');
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

  ngOnDestroy() {
    if (this.problemSubscription) {
      this.problemSubscription.unsubscribe();
    }
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
      seconds: this.problem.timeout,
      tests: this.problem.tests
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
