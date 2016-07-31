import { Component, OnInit, ViewChild } from '@angular/core';
import { CodeEditorComponent } from '../../code-editor';
import { SubmissionModalComponent } from '../../submission-modal';
import { MarkdownPipe, Problem, Submission } from '../../shared';
import { SharingService } from '../shared';

const DefaultSubmission: Submission = {
  lang: 'c',
  src: '',
  problem: undefined
};

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
export class ViewComponent implements OnInit {
  problem: Problem;
  submission: Submission;

  @ViewChild('submissionModal') submissionModal: SubmissionModalComponent;

  constructor(private sharingService: SharingService) {
    this.problem = sharingService.problem;
    sharingService.problemObservable.subscribe(problem => this.problem = problem);
  }

  ngOnInit() {
  }

  submit(): void {
    this.submissionModal.handleSubmission(this.sharingService.submission);
    // TODO: record submission data
  }
}
