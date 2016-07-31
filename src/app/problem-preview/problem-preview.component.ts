import { Component, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Problem } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-problem-preview',
  templateUrl: 'problem-preview.component.html',
  styleUrls: ['problem-preview.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class ProblemPreviewComponent {
  @Input() problem: Problem;
}
