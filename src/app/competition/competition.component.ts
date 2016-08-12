import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { CollapseDirective } from 'ng2-bootstrap';
import { Competition, CompetitionProblem, RepositoryService, Time } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-competition',
  templateUrl: 'competition.component.html',
  styleUrls: ['competition.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    CollapseDirective
  ]
})
export class CompetitionComponent implements OnInit {
  collapsed = false;
  competition: Competition;
  problems: CompetitionProblem[];
  remainingTime: Time;

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
          Observable.interval(1000).subscribe(() => {
            let now = new Date();
            this.remainingTime = Time.betweenDates(now, competition.endTime);
          });
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
