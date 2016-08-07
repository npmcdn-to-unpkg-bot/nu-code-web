import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditProblemFormComponent } from '../edit-problem-form';
import { AuthService, Problem, RepositoryService, TestCase, } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-edit-problem',
  templateUrl: 'edit-problem.component.html',
  styleUrls: ['edit-problem.component.css'],
  directives: [EditProblemFormComponent]
})
export class EditProblemComponent implements OnInit {
  // problem = new Problem();
  // testCases = [new TestCase()];
  problem: Problem;
  testCases: TestCase[];

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private authService: AuthService,
      private repoService: RepositoryService) { }

  ngOnInit() {
    // Get the problem we are updating
    let problemId = this.route.snapshot.params['id'];
    this.repoService.getProblem(problemId).take(1).subscribe(
        problem => this.problem = problem);
    // Get the testCases we are updating
    this.repoService.getTestCases(problemId).take(1).subscribe(
        testCases => this.testCases = testCases);
  }

  update(): void {
    // TODO: show loading progress
    // TODO: potential bug with timing here.
    let problemId = this.problem.$key;
    this.repoService.updateProblem(this.problem, this.testCases);
    this.router.navigate(['/problems', problemId]);
  }
}
