import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { CollapseDirective } from 'ng2-bootstrap';
import { ScoreboardPreviewComponent } from './scoreboard-preview';
import { Competition, CompetitionProblem, RepositoryService, TimeSpan, ZeroPadPipe } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-competition',
  templateUrl: 'competition.component.html',
  styleUrls: ['competition.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    CollapseDirective,
    ScoreboardPreviewComponent
  ],
  pipes: [ZeroPadPipe]
})
export class CompetitionComponent implements OnInit {
  collapsed = false;
  competition: Competition;
  problems: CompetitionProblem[];
  remainingTime: TimeSpan;

  countdown: Subscription;

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
          this.remainingTime = TimeSpan.until(competition.endTime);
          if (this.countdown) {
            this.countdown.unsubscribe();
          }
          this.countdown = Observable.interval(1000).subscribe(() => {
            this.remainingTime.subtractSeconds(1);
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
