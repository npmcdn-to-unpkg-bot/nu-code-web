import { Component, OnInit, Input } from '@angular/core';
import { Problem } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-problem',
  templateUrl: 'problem.component.html',
  styleUrls: ['problem.component.css']
})
export class ProblemComponent implements OnInit {
  @Input() problem: Problem;

  constructor() {}

  ngOnInit() {
  }

}
