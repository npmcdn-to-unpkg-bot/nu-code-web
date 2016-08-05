import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AuthService, RepositoryService, SuccessfulSubmission } from '../../shared';
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
      private authService: AuthService,
      private sharingService: SharingService,
      private repoService: RepositoryService) { }

  ngOnInit() {
    this.sharingService.problemObservable.subscribe(
        problem => {
          if (problem) {
            this.repoService.getLeaderboard(problem.$key).subscribe(
                topSubmissions => this.topSubmissions = topSubmissions);
          }
        });
  }
}
