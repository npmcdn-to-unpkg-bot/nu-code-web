import { Component, OnInit, Input } from '@angular/core';
import { CompetitionProblem, RepositoryService } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-problem-preview',
  templateUrl: 'problem-preview.component.html',
  styleUrls: ['problem-preview.component.css']
})
export class ProblemPreviewComponent implements OnInit {
  @Input() problem: CompetitionProblem;

  constructor(private repoService: RepositoryService) { }

  ngOnInit() {
  }

}
