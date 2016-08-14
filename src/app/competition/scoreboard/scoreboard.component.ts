import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import {
  Competition,
  CompetitionScoreboardRanking,
  RepositoryService,
  TimeSpan,
  ZeroPadPipe
} from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-scoreboard',
  templateUrl: 'scoreboard.component.html',
  styleUrls: ['scoreboard.component.css'],
  directives: [ROUTER_DIRECTIVES],
  pipes: [ZeroPadPipe]
})
export class ScoreboardComponent implements OnInit {
  competition: Competition;
  rankings: CompetitionScoreboardRanking[];
  remainingTime: TimeSpan;

  countdown: Subscription;

  constructor(
      private route: ActivatedRoute,
      private repoService: RepositoryService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let competitionId = params['id'];
      this.repoService.getCompetition(competitionId)
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
      this.repoService.getCompetitionScoreboard(competitionId)
          .subscribe(rankings => this.rankings = rankings);
    });
  }
}
