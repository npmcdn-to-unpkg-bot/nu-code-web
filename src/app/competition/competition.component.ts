import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { CollapseDirective } from 'ng2-bootstrap';
import { CountdownComponent } from '../countdown';
import { ProblemPreviewComponent } from './problem-preview';
import { ScoreboardPreviewComponent } from './scoreboard-preview';
import {
  AuthService,
  Competition,
  CompetitionProblem,
  CompetitionScoreboardRanking,
  RepositoryService
} from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-competition',
  templateUrl: 'competition.component.html',
  styleUrls: ['competition.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    CollapseDirective,
    CountdownComponent,
    ProblemPreviewComponent,
    ScoreboardPreviewComponent
  ],
  // encapsulation: ViewEncapsulation.None
})
export class CompetitionComponent implements OnInit {
  collapsed = false;
  ended = false;
  competition: Competition;
  problems: CompetitionProblem[];
  myRanking: any;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private authService: AuthService,
      private repoService: RepositoryService) { }

  ngOnInit() {
    let competitionId = this.route.snapshot.params['id'];
    this.repoService
        .getCompetition(competitionId)
        .subscribe(competition => {
          this.competition = competition;
          Observable.timer(this.competition.endTime).subscribe(() => {
            this.ended = true;
          });
        });
    this.repoService
        .getCompetitionProblems(competitionId)
        .subscribe(competitionProblems => {
          this.problems = competitionProblems;
          if (this.problems[0]) {
            this.router.navigate([competitionProblems[0].$key], { relativeTo: this.route });
          }
        });
    this.authService.user.subscribe(user => {
      let uid = user.$key;
      this.repoService
          .getCompetitionRanking(competitionId, uid)
          .subscribe(ranking => this.myRanking = ranking);
    });
  }

  hasSolved(problemId: string): boolean {
    let submissionInfo = this.myRanking && this.myRanking.problems
        ? this.myRanking.problems[problemId]
        : null;
    return submissionInfo && submissionInfo.solutionSubmittedAfter !== undefined;
  }

  numIncorrect(problemId: string): number {
    // null if no submissions have been made to this problem
    let submissionInfo = this.myRanking && this.myRanking.problems
        ? this.myRanking.problems[problemId]
        : null;
    return submissionInfo ? submissionInfo.incorrectSubmissions : 0;
  }
}
