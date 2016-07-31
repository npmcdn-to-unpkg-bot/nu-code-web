import { Component, OnInit } from '@angular/core';
import { Problem, RepositoryService } from '../shared';
import { ProblemPreviewComponent } from './problem-preview';

@Component({
  moduleId: module.id,
  selector: 'app-problem-list',
  templateUrl: 'problem-list.component.html',
  styleUrls: ['problem-list.component.css'],
  directives: [ProblemPreviewComponent]
})
export class ProblemListComponent implements OnInit {
  problems: Problem[];

  constructor(private repoService: RepositoryService) {}

  ngOnInit() {
    this.repoService.getTopProblems(10)
      .subscribe(problems => this.problems = problems);
  }

}
