import { Component, OnInit, Input } from '@angular/core';
import { RepositoryService, CompetitionScoreboard } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-scoreboard-preview',
  templateUrl: 'scoreboard-preview.component.html',
  styleUrls: ['scoreboard-preview.component.css']
})
export class ScoreboardPreviewComponent implements OnInit {
  @Input() competitionId: string;
  scoreboard: CompetitionScoreboard;

  constructor(private repoService: RepositoryService) { }

  ngOnInit() {
    this.repoService.getCompetitionScoreboard(this.competitionId)
        .subscribe(scoreboard => this.scoreboard = scoreboard);
  }

}
