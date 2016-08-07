import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { FaDirective } from 'angular2-fontawesome/directives';
import { Problem, TestCase } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-edit-problem-form',
  templateUrl: 'edit-problem-form.component.html',
  styleUrls: ['edit-problem-form.component.css'],
  directives: [
    FORM_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES,
    FaDirective
  ]
})
export class EditProblemFormComponent implements OnInit {
  @Input() problem: Problem;
  @Input() testCases: TestCase[];

  @Output() submit = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addTestCase(): void {
    this.testCases.push(new TestCase());
  }

  removeTestCase(index: number): void {
    // TODO: confirm deletion
    // TODO: bug in angular? try adding a test case, deleting the first then adding again
    this.testCases.splice(index, 1);
  }

  send(): void {
    this.removeEmptyHints();
    this.submit.emit({ problem: this.problem, testCases: this.testCases });
  }

  private removeEmptyHints() {
    this.testCases.forEach(testCase => {
      if (testCase.hint && testCase.hint.trim() === '') {
        delete testCase.hint;
      }
    });
  }
}
