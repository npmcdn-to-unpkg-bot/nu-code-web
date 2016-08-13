import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompetitionScoreboardRanking, RepositoryService } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-scoreboard',
  templateUrl: 'scoreboard.component.html',
  styleUrls: ['scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  rankings: CompetitionScoreboardRanking[];

  constructor(
      private route: ActivatedRoute,
      private repoService: RepositoryService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let competitionId = params['id'];
      this.repoService.getCompetitionScoreboard(competitionId)
          .subscribe(rankings => this.rankings = rankings);
    });
  }
}
