import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { RepositoryService, Time, ZeroPadPipe } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-countdown',
  templateUrl: 'countdown.component.html',
  styleUrls: ['countdown.component.css'],
  pipes: [ZeroPadPipe]
})
export class CountdownComponent implements OnInit {
  competitionName: string;
  startTime: Date;
  remainingTime: Time;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private repoService: RepositoryService) { }

  ngOnInit() {
    let competitionId = this.route.snapshot.params['id'];
    this.repoService.getCompetition(competitionId).subscribe(competition => {
      this.competitionName = competition.name;
      this.startTime = competition.startTime;
    });

    // Start the timer
    let subscription = Observable.interval(1000).subscribe(() => {
      let now = new Date();
      let remainingMilliseconds = this.startTime.getTime() - now.getTime();
      if (remainingMilliseconds > 0) {
        this.remainingTime = new Time(remainingMilliseconds);
      } else {
        this.router.navigate(['competitions', competitionId]);
        subscription.unsubscribe();
      }
    });
  }
}
