import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { RepositoryService } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-countdown',
  templateUrl: 'countdown.component.html',
  styleUrls: ['countdown.component.css']
})
export class CountdownComponent implements OnInit {
  startTime: Date;
  remainingTime: Time;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private repoService: RepositoryService) { }

  ngOnInit() {
    let competitionId = this.route.snapshot.params['id'];
    this.repoService.getCompetition(competitionId)
        .map(competition => competition.startTime)
        .subscribe(time => {
          this.startTime = time;
        });

    // Start the timer
    let subscription = Observable.interval(1000).subscribe(() => {
      let now = new Date();
      let remainingMilliseconds = this.startTime.getTime() - now.getTime();
      let remainingSeconds = Math.floor(remainingMilliseconds / 1000);
      if (remainingSeconds > 0) {
        this.remainingTime = Time.fromSeconds(remainingSeconds);
      } else {
        this.router.navigate(['competitions', competitionId]);
        subscription.unsubscribe();
      }
    });
  }
}

interface Time {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

namespace Time {
  export function fromSeconds(seconds: number): Time {
    let days = Math.floor(seconds / 86400);
    seconds -= days * 86400;

    let hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;

    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    return { days, hours, minutes, seconds };
  }
}
