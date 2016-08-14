import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { CountdownComponent } from '../../countdown';
import { RepositoryService, TimeSpan, ZeroPadPipe } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-countdown',
  templateUrl: 'waiting.component.html',
  styleUrls: ['waiting.component.css'],
  directives: [CountdownComponent]
})
export class WaitingComponent implements OnInit {
  competitionName: string;
  startTime: Date;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private repoService: RepositoryService) { }

  ngOnInit() {
    let competitionId = this.route.snapshot.params['id'];
    this.repoService.getCompetition(competitionId).subscribe(competition => {
      this.competitionName = competition.name;
      this.startTime = competition.startTime;
      // if (this.untilStart.totalMilliseconds <= 0) {
      //   this.router.navigate(['competitions', competitionId]);
      // }
    });
  }
}
