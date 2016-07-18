import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Problem } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-problem-preview',
  templateUrl: 'problem-preview.component.html',
  styleUrls: ['problem-preview.component.css']
})
export class ProblemPreviewComponent implements OnInit {
  @Input() problem: Problem;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  openProblemPage() {
    // TODO: I potentially need to make an ID for the problems
    let problemId = this.problem.name.replace(/[^\w\d]/g, '');
    this.router.navigate(['/problems/', problemId]);
  }

}
