import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MODAL_DIRECTIVES, BS_VIEW_PROVIDERS, ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { LanguageDropdownComponent } from '../language-dropdown';
import { Problem, ProblemService, SupportedLanguages } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-problem',
  templateUrl: 'problem.component.html',
  styleUrls: [
    'problem.component.css',
    'loading-spinner.css'
  ],
  directives: [
    MODAL_DIRECTIVES,
    LanguageDropdownComponent
  ],
  viewProviders: [BS_VIEW_PROVIDERS]
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
  // A connection opened in submit(), closed in cancelSubmit() ... TODO: probably closed elsewhere too
  private submissionSubscription: Subscription;

  @ViewChild('submissionModal') submissionModal: ModalDirective;

  constructor(
    private http: Http,
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
              // TODO: this should be a separate function or something (see ansi-to-html)
              this.problem.description = this.problem.description.replace(/\\n/g, '<br>');
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
    const submissionJson = JSON.stringify(submission);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.submissionSubscription =
        this.http.post('http://172.17.0.2:8080/api', submissionJson, {headers: headers})
            .subscribe(response => console.log(response));
    // TODO: catch no response
    this.submissionModal.show();
    // TODO: send submission data
  }

  cancelSubmit() {
    this.submissionModal.hide();
    // TODO: make sure this does not store the result
    this.submissionSubscription.unsubscribe();
  }
}

enum Tab {
  Problem,
  MySubmissions,
  Leaderboard
}
