import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { CountdownComponent } from '../../countdown';
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
  directives: [
    ROUTER_DIRECTIVES,
    CountdownComponent
  ]
})
export class ScoreboardComponent implements OnInit {
  competition: Competition;
  rankings: CompetitionScoreboardRanking[];
  endTime: Date;

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
            this.endTime = competition.endTime;
          });
      this.repoService.getCompetitionScoreboard(competitionId)
          .subscribe(rankings => this.rankings = rankings);
    });
  }
}
