import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CatchSignature } from 'rxjs/operator/catch';
import { LanguageDropdownComponent } from '../language-dropdown';
import { SubmissionModalComponent } from '../submission-modal';
import { MarkdownPipe, Problem, ProblemService, SupportedLanguages } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-problem',
  templateUrl: 'problem.component.html',
  styleUrls: ['problem.component.css'],
  directives: [
    LanguageDropdownComponent,
    SubmissionModalComponent
  ],
  pipes: [MarkdownPipe]
})
export class ProblemComponent implements OnInit, OnDestroy {
  // TODO: can this be const?
  CharacterLimit = 100000;
  SupportedLanguages = SupportedLanguages;

  // problem: Problem;
  problem: any;
  currentTab: Tab;

  langCode: string = '';
  sourceCode: string = '';

  // A connection opened in ngOnInit(), closed in ngOnDestroy()
  private problemSubscription: Subscription;

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
              } else {
                this.goToProblemsList();
              }
            })
        });
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

  numChars() {
    return this.sourceCode ? this.sourceCode.length : 0;
  }

  onLangChange(langCode: string) {
    this.langCode = langCode;
  }

/*
#include <stdio.h>
int main()
{
  printf("233168");
}
*/
  submit(): void {
    const submission = {
      lang: this.langCode,
      src: this.sourceCode,
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
