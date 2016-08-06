import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { FaDirective } from 'angular2-fontawesome/directives';
import { ProblemPreviewComponent } from './problem-preview';
import { AuthService, Problem, RepositoryService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-problem-list',
  templateUrl: 'problem-list.component.html',
  styleUrls: ['problem-list.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    FaDirective,
    ProblemPreviewComponent
  ]
})
export class ProblemListComponent implements OnInit {
  problems: Problem[];
  canCreateProblem: boolean;

  constructor(
      private authService: AuthService,
      private repoService: RepositoryService) { }

  ngOnInit() {
    this.authService.isNeumonter
        .subscribe(isNeumonter => this.canCreateProblem = isNeumonter);
    this.repoService.getTopProblems(10)
        .subscribe(problems => this.problems = problems);
  }
}
