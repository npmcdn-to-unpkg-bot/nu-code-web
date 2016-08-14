import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
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
  directives: [ROUTER_DIRECTIVES],
  pipes: [
    SpacifyPipe,
    ZeroPadPipe
  ]
})
export class CompetitionPreviewComponent implements OnInit, OnDestroy {
  @Input() competition: Competition;
  state: State = 'Distanced';

  scheduled: Subscription;
  timer: Subscription;

  untilStart: TimeSpan;

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
        // Start the countdown timer
        this.untilStart = TimeSpan.until(this.competition.startTime);
        this.timer = Observable.interval(1000).subscribe(() => {
          this.untilStart.subtractSeconds(1);
        });

        this.scheduled = Observable.timer(this.competition.startTime).subscribe(() => {
          this.state = 'Started';
          if (this.timer) {
            this.timer.unsubscribe();
          }

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

  ngOnDestroy() {
    if (this.scheduled) {
      this.scheduled.unsubscribe();
    }
    if (this.timer) {
      this.timer.unsubscribe();
    }
  }
}

type State = 'Distanced' | 'StartingSoon' | 'Started' | 'JustEnded' | 'Ended';
