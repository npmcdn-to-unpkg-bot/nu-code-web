import { Component, OnInit, Input } from '@angular/core';
import { Problem } from '../shared/problem';

@Component({
  moduleId: module.id,
  selector: 'app-problem-preview',
  templateUrl: 'problem-preview.component.html',
  styleUrls: ['problem-preview.component.css']
})
export class ProblemPreviewComponent implements OnInit {
  @Input() problem: Problem;

  constructor() {}

  ngOnInit() {
  }

}
