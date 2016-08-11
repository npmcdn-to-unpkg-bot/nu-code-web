import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { Competition, SpacifyPipe, Time } from '../../shared';

// The time in milliseconds before a competition is considered to start soon
// 6 hours = 21600000
const StartingSoonMilliseconds = 21600000;
// The period after the end date to say "just ended"
// 10 minutes = 600000
const JustEndedMilliseconds = 600000;

@Component({
  moduleId: module.id,
  selector: 'app-competition-preview',
  templateUrl: 'competition-preview.component.html',
  styleUrls: ['competition-preview.component.css'],
  directives: [ROUTER_DIRECTIVES],
  pipes: [SpacifyPipe]
})
export class CompetitionPreviewComponent implements OnInit, OnDestroy {
  @Input() competition: Competition;
  state: State = 'Distanced';

  scheduled: Subscription;
  timer: Subscription;

  untilStart: Time;

  ngOnInit() {
    let currentMilliseconds = new Date().getTime();
    let startMilliseconds = this.competition.startTime.getTime();
    let endMilliseconds = this.competition.endTime.getTime();

    let millisecondsBeforeStart = startMilliseconds - currentMilliseconds;
    let startingSoonMilliseconds = millisecondsBeforeStart - StartingSoonMilliseconds;
    let millisecondsBeforeJustEnded = endMilliseconds - currentMilliseconds;
    let millisecondsBeforeHardEnded = millisecondsBeforeJustEnded + JustEndedMilliseconds;

    this.scheduled = Observable.timer(startingSoonMilliseconds).subscribe(() => {
      this.state = 'StartingSoon';
      // Start the countdown timer
      this.timer = Observable.timer(0, 1000).subscribe(() => {
        let now = new Date();
        // TODO: Performance
        this.untilStart = Time.betweenDates(now, this.competition.startTime);
      });

      this.scheduled = Observable.timer(millisecondsBeforeStart).subscribe(() => {
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
