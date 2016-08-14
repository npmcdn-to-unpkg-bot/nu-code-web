import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import * as moment from 'moment';
import { CountdownComponent } from '../../countdown';
import { Competition, SpacifyPipe, TimeSpan, ZeroPadPipe } from '../../shared';

// The time in milliseconds before a competition is considered to start soon
// 6 hours = 21600000
const StartingSoonThreshold = 21600000;
// The period after the end date to say "just ended"
// 10 minutes = 600000
const JustEndedThreshold = 600000;
const OneDayInMilliseconds = 86400000;

@Component({
  moduleId: module.id,
  selector: 'app-competition-preview',
  templateUrl: 'competition-preview.component.html',
  styleUrls: ['competition-preview.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    CountdownComponent
  ],
  pipes: [SpacifyPipe]
})
export class CompetitionPreviewComponent implements OnInit, OnDestroy {
  @Input() competition: Competition;
  state: State = 'Distanced';

  scheduled: Subscription;

  ngOnInit() {
    let currentMilliseconds = new Date().getTime();
    let startMilliseconds = this.competition.startTime.getTime();
    let millisecondsBeforeStart = startMilliseconds - currentMilliseconds;
    // Schedule more if and only if the competition starts within one day
    if (millisecondsBeforeStart < OneDayInMilliseconds) {
      let endMilliseconds = this.competition.endTime.getTime();
      let startingSoonMilliseconds = millisecondsBeforeStart - StartingSoonThreshold;
      let millisecondsBeforeJustEnded = endMilliseconds - currentMilliseconds;
      let millisecondsBeforeHardEnded = millisecondsBeforeJustEnded + JustEndedThreshold;

      this.scheduled = Observable.timer(startingSoonMilliseconds).subscribe(() => {
        this.state = 'StartingSoon';

        this.scheduled = Observable.timer(this.competition.startTime).subscribe(() => {
          this.state = 'Started';

          this.scheduled = Observable.timer(millisecondsBeforeJustEnded).subscribe(() => {
            this.state = 'JustEnded';

            this.scheduled = Observable.timer(millisecondsBeforeHardEnded).subscribe(() => {
              this.state = 'Ended';
            });
          });
        });
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
