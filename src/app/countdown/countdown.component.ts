import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { TimeSpan, ZeroPadPipe } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-countdown',
  templateUrl: 'countdown.component.html',
  styleUrls: ['countdown.component.css'],
  pipes: [ZeroPadPipe]
})
export class CountdownComponent implements OnInit, OnDestroy {
  @Input() date: Date;
  @Input() interval = 1000;
  @Input() warningTime = 1000 * 60 * 10; // 10 minutes
  @Input() alertTime = 1000 * 60; // 1 minute
  @Input() labels = false;
  @Input() hide = true;
  @Input() colors = true;

  private timeSpan: TimeSpan = new TimeSpan();

  private timer: Subscription;

  constructor() { }

  ngOnInit() {
    if (this.date) {
      this.timeSpan = TimeSpan.until(this.date);
      let secondsUntil = this.timeSpan.totalSeconds;
      if (secondsUntil > 0) {
        this.timer =
            Observable
                .interval(this.interval)
                .take(secondsUntil)
                .subscribe(() => {
                  this.timeSpan.subtractSeconds(1);
                });
      }
    }
  }

  ngOnDestroy() {
    if (this.timer) {
      this.timer.unsubscribe();
    }
  }

  pastWarningTime() {
    return this.timeSpan.totalMilliseconds <= this.warningTime;
  }

  pastAlertTime() {
    return this.timeSpan.totalMilliseconds <= this.alertTime;
  }
}
