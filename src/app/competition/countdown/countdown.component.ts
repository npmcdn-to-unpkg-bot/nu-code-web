import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { RepositoryService, TimeSpan, ZeroPadPipe } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-countdown',
  templateUrl: 'countdown.component.html',
  styleUrls: ['countdown.component.css'],
  pipes: [ZeroPadPipe]
})
export class CountdownComponent implements OnInit {
  competitionName: string;
  untilStart: TimeSpan;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private repoService: RepositoryService) { }

  ngOnInit() {
    let competitionId = this.route.snapshot.params['id'];
    this.repoService.getCompetition(competitionId).subscribe(competition => {
      this.competitionName = competition.name;
      // Start the timer
      this.untilStart = TimeSpan.until(competition.startTime);
      let timer = Observable.interval(1000).subscribe(() => {
        this.untilStart.subtractSeconds(1);
        if (this.untilStart.totalMilliseconds <= 0) {
          this.router.navigate(['competitions', competitionId]);
          timer.unsubscribe();
        }
      });
    });
  }
}
