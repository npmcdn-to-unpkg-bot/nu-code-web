import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';
import { CountdownComponent } from '../../countdown';
import { Competition, RepositoryService } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-countdown',
  templateUrl: 'waiting.component.html',
  styleUrls: ['waiting.component.css'],
  directives: [CountdownComponent]
})
export class WaitingComponent implements OnInit {
  competition: Competition;
  allottedTime = '';

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private repoService: RepositoryService) { }

  ngOnInit() {
    let competitionId = this.route.snapshot.params['id'];
    this.repoService
        .getCompetition(competitionId)
        .subscribe(competition => {
          this.competition = competition;
          let competitionLength = competition.endTime.getTime() - competition.startTime.getTime();
          this.allottedTime = moment.duration(competitionLength, 'ms').humanize();
          // Schedule navigation
          Observable.timer(competition.startTime).subscribe(() => {
            this.router.navigate(['competitions', competitionId]);
          });
        });
  }
}
