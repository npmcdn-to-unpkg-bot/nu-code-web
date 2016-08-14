import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import * as moment from 'moment';
import { CountdownComponent } from '../../countdown';
import { Competition, TimeSpan } from '../../shared';

// The time in milliseconds before a competition is considered to start soon
// 6 hours = 21600000
const startingSoonThreshold = 21600000;
// The period after the end date to say "hard ended"
// 10 minutes = 600000
const hardEndThreshold = 600000;
const oneDayInMilliseconds = 86400000;

@Component({
  moduleId: module.id,
  selector: 'app-competition-preview',
  templateUrl: 'competition-preview.component.html',
  styleUrls: ['competition-preview.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    CountdownComponent
  ]
})
export class CompetitionPreviewComponent implements OnInit, OnDestroy {
  @Input() competition: Competition;
  state: State = 'Distanced';

  scheduled: Subscription;

  ngOnInit() {
    let currentMilliseconds = new Date().getTime();
    let millisecondsUntilStart = this.competition.startTime.getTime() - currentMilliseconds;
    let millisecondsUntilStartingSoon = millisecondsUntilStart - startingSoonThreshold;

    // Schedule more if next is within one day
    if (millisecondsUntilStartingSoon < oneDayInMilliseconds) {
      let millisecondsUntilEnd = this.competition.endTime.getTime() - currentMilliseconds;
      let millisecondsUntilHardEnd = millisecondsUntilEnd + hardEndThreshold;

      this.scheduled = Observable.timer(millisecondsUntilStartingSoon).subscribe(() => {
        this.state = 'StartingSoon';

        // Schedule more if next is within one day
        if (millisecondsUntilStart < oneDayInMilliseconds) {
          this.scheduled = Observable.timer(this.competition.startTime).subscribe(() => {
            this.state = 'Started';

            // Schedule more if next is within one day
            if (millisecondsUntilEnd < oneDayInMilliseconds) {
              this.scheduled = Observable.timer(millisecondsUntilEnd).subscribe(() => {
                this.state = 'JustEnded';

                // Schedule more if next is within one day
                if (millisecondsUntilHardEnd < oneDayInMilliseconds) {
                  this.scheduled = Observable.timer(millisecondsUntilHardEnd).subscribe(() => {
                    this.state = 'Ended';
                  });
                }
              });
            }
          });
        }
      });
    }
  }

  abbreviateAgo(date: Date) {
    return moment.duration(TimeSpan.since(date).totalMilliseconds, 'ms').humanize();
  }

  ngOnDestroy() {
    if (this.scheduled) {
      this.scheduled.unsubscribe();
    }
  }
}

type State = 'Distanced' | 'StartingSoon' | 'Started' | 'JustEnded' | 'Ended';
