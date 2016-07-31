import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-leaderboard',
  templateUrl: 'leaderboard.component.html',
  styleUrls: ['leaderboard.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class LeaderboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
