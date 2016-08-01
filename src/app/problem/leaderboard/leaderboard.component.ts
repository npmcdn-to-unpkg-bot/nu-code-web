import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { SuccessfulSubmission, RepositoryService } from '../../shared';
import { SharingService } from '../shared';
import { RankingComponent } from './ranking';

@Component({
  moduleId: module.id,
  selector: 'app-leaderboard',
  templateUrl: 'leaderboard.component.html',
  styleUrls: ['leaderboard.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    RankingComponent
  ]
})
export class LeaderboardComponent implements OnInit {
  topSubmissions: SuccessfulSubmission[];

  constructor(
      private sharingService: SharingService,
      private repoService: RepositoryService) { }

  ngOnInit() {
    if (this.sharingService.problem) {
      this.initLeaderboard(this.sharingService.problem.$key)
    } else {
      this.sharingService.problemObservable.subscribe(
          problem => this.initLeaderboard(problem.$key));
    }
  }

  private initLeaderboard(problemId: string) {
    this.repoService.getLeaderboard(problemId).subscribe(
          topSubmissions => this.topSubmissions = topSubmissions);
  }

}
