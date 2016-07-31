import { Component } from '@angular/core';
import { CodeEditorComponent } from '../../code-editor';
import { SubmissionModalComponent } from '../../submission-modal';
import { MarkdownPipe, Problem, Submission } from '../../shared';
import { SharingService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-view',
  templateUrl: 'view.component.html',
  styleUrls: ['view.component.css'],
  directives: [
    CodeEditorComponent,
    SubmissionModalComponent
  ],
  pipes: [MarkdownPipe]
})
export class ViewComponent {
  problem: Problem;
  submission: Submission;

  constructor(sharingService: SharingService) {
    this.problem = sharingService.problem;
    sharingService.problemObservable.subscribe(problem => this.problem = problem);

    this.submission = sharingService.submission;
    sharingService.submissionObservable.subscribe(submission => this.submission = submission);
  }
}
