import { Component, Input, OnInit } from '@angular/core';
import { LangPipe, PrecisionPipe, SuccessfulSubmission, RepositoryService } from '../../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-ranking',
  templateUrl: 'ranking.component.html',
  styleUrls: ['ranking.component.css'],
  pipes: [
    LangPipe,
    PrecisionPipe
  ]
})
export class RankingComponent implements OnInit {
  @Input() rank: number;
  @Input() submission: SuccessfulSubmission;
  username: string;

  constructor(private repoService: RepositoryService) { }

  ngOnInit() {
    this.repoService.getUser(this.submission.submitterUid).subscribe(
        user => this.username = user.name);
  }
}
