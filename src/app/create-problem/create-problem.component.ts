import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FORM_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, Problem, RepositoryService, TestCase, } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-create-problem',
  templateUrl: 'create-problem.component.html',
  styleUrls: ['create-problem.component.css'],
  directives: [
    FORM_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES
  ]
})
export class CreateProblemComponent implements OnInit {
  problem = new Problem();
  testCases = [new TestCase()];
  @ViewChild('form') form;

  constructor(
      private router: Router,
      private authService: AuthService,
      private repoService: RepositoryService) { }

  ngOnInit() {
    // Set creator to the logged in user's uid
    this.authService.auth.take(1).subscribe(auth => this.problem.creatorUid = auth.uid);
  }

  addTestCase(): void {
    this.testCases.push(new TestCase());
  }

  submit(): void {
    this.removeEmptyHints();
    // TODO: show loading progress
    let problemId = this.repoService.createProblem(this.problem, this.testCases);
    this.router.navigate(['/problems', problemId]);
  }

  private removeEmptyHints() {
    this.testCases.forEach(testCase => {
      if (testCase.hint && testCase.hint.trim() === '') {
        delete testCase.hint;
      }
    });
  }
}
