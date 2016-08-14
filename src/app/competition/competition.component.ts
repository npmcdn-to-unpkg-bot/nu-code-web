import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { CollapseDirective } from 'ng2-bootstrap';
import { CountdownComponent } from '../countdown';
import { ScoreboardPreviewComponent } from './scoreboard-preview';
import { Competition, CompetitionProblem, RepositoryService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-competition',
  templateUrl: 'competition.component.html',
  styleUrls: ['competition.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    CollapseDirective,
    CountdownComponent,
    ScoreboardPreviewComponent
  ]
})
export class CompetitionComponent implements OnInit {
  collapsed = false;
  competition: Competition;
  problems: CompetitionProblem[];

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private repoService: RepositoryService) { }

  ngOnInit() {
    let competitionId = this.route.snapshot.params['id'];
    this.repoService
        .getCompetition(competitionId)
        .subscribe(competition => {
          this.competition = competition;
        });
    this.repoService
        .getCompetitionProblems(competitionId)
        .subscribe(competitionProblems => {
          this.problems = competitionProblems;
          // Weird bug where the repoService (angularfire2) call returns an empty array
          if (this.problems[0]) {
            this.router.navigate([competitionProblems[0].$key], { relativeTo: this.route });
          }
        });
  }
}
