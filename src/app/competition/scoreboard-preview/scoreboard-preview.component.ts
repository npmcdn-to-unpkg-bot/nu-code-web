import { Component, OnInit, Input } from '@angular/core';
import { RepositoryService, CompetitionScoreboardRanking } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-scoreboard-preview',
  templateUrl: 'scoreboard-preview.component.html',
  styleUrls: ['scoreboard-preview.component.css']
})
export class ScoreboardPreviewComponent implements OnInit {
  @Input() competitionId: string;
  rankings: CompetitionScoreboardRanking[];

  constructor(private repoService: RepositoryService) { }

  ngOnInit() {
    this.repoService.getCompetitionScoreboard(this.competitionId)
        .subscribe(rankings => this.rankings = rankings);
  }

}
