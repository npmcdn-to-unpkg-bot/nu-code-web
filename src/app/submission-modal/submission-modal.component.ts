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

  display: string = '';

  constructor(private submissionService: SubmissionService) {}

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.submissionSubscription) {
      this.submissionSubscription.unsubscribe();
    }
  }

  handleSubmission(submission: Submission) {
    this.display = 'Submitting...';
    this.modal.show();

    this.submissionSubscription = this.submissionService.submit(submission).subscribe(
        result => {
          this.display = 'Results received';
        },
        err => {
          this.display = 'Server error';
        });
  }

  handleResult(self, result: any) {
    this.display = 'Results received';
    this.modal.hide();
  }

  handleServerError(self, err: any) {
    this.display = 'Server Error';
  }

}
