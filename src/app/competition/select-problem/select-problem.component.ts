import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { CompetitionProblem, RepositoryService } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-select-problem',
  templateUrl: 'select-problem.component.html',
  styleUrls: ['select-problem.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class SelectProblemComponent implements OnInit {
  problems: CompetitionProblem[];

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private repoService: RepositoryService) { }

  ngOnInit() {
    let competitionId = this.route.snapshot.params['id'];
    this.repoService
        .getCompetitionProblems(competitionId)
        .subscribe(competitionProblems => this.problems = competitionProblems);
  }

}
