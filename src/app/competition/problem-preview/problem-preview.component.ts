import { Component, OnInit, Input } from '@angular/core';
import { FaDirective } from 'angular2-fontawesome/directives';
import { CompetitionProblem, RepositoryService } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-problem-preview',
  templateUrl: 'problem-preview.component.html',
  styleUrls: ['problem-preview.component.css'],
  directives: [FaDirective]
})
export class ProblemPreviewComponent implements OnInit {
  @Input() problemName: string;
  @Input() solved: boolean;
  @Input() numIncorrect: number;

  constructor() { }

  ngOnInit() {
  }

}
