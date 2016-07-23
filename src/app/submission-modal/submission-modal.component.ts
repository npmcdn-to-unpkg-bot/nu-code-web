import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { BS_VIEW_PROVIDERS, MODAL_DIRECTIVES, ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { Submission, SubmissionService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-submission-modal',
  templateUrl: 'submission-modal.component.html',
  styleUrls: ['submission-modal.component.css'],
  directives: [MODAL_DIRECTIVES],
  providers: [SubmissionService],
  viewProviders: [BS_VIEW_PROVIDERS]
})
export class SubmissionModalComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal: ModalDirective;
  submissionSubscription: Subscription;

  state: State;
  result: any;

  constructor(private submissionService: SubmissionService) {}

  ngOnInit() {
  }

  ngOnDestroy() {
    this.killSubscription();
  }

  handleSubmission(submission: Submission) {
    this.state = State.Submitting;
    this.submissionSubscription = this.submissionService.submit(submission).subscribe(
        result => {
          this.state = State.ResultReceived;
          this.result = result;
        },
        err => {
          this.state = State.ServerError;
        },
        () => {
          // You cannot use this directly as the callback because the `this` context will be wrong.
          this.killSubscription();
        });
    this.modal.show();
  }

  killSubscription() {
    if (this.submissionSubscription) {
      this.submissionSubscription.unsubscribe();
      this.submissionSubscription = null;
    }
  }

  cancel() {
    this.killSubscription();
    this.close();
  }

  close() {
    this.modal.hide();
  }

}

enum State {
  Submitting,
  ResultReceived,
  ServerError
}
