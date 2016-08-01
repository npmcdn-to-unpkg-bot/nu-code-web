import { Component, Input, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {
  LangPipe,
  PrecisionPipe,
  SuccessfulSubmission,
  RepositoryService,
  User
} from '../../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-ranking',
  templateUrl: 'ranking.component.html',
  styleUrls: ['ranking.component.css'],
  directives: [ROUTER_DIRECTIVES],
  pipes: [
    LangPipe,
    PrecisionPipe
  ]
})
export class RankingComponent implements OnInit {
  @Input() rank: number;
  @Input() submission: SuccessfulSubmission;
  submitter: User;

  constructor(private repoService: RepositoryService) { }

  ngOnInit() {
    this.repoService.getUser(this.submission.submitterUid).subscribe(
        user => this.submitter = user);
  }
}
