import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CodeEditorComponent } from '../../code-editor';
import { SubmissionModalComponent } from '../../submission-modal';
import { AuthService, MarkdownPipe, Problem, ProblemService, Submission } from '../../shared';

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
export class ViewComponent { // implements OnInit {
// // Loaded from problemService on init
//   problem: Problem;
//   // Manipulated by editor. Set as a new object instance so as not to keep it in memory
//   submission: Submission = {
//     lang: DefaultSubmission.lang,
//     src: DefaultSubmission.src,
//     problem: DefaultSubmission.problem
//   };

//   @ViewChild('submissionModal') submissionModal: SubmissionModalComponent;

//   constructor(
//       private router: Router,
//       private route: ActivatedRoute,
//       private problemService: ProblemService,
//       private authService: AuthService) {}

//   ngOnInit() {

//   }

//   submit(): void {
//     this.submissionModal.handleSubmission(this.submission);
//     // TODO: record submission data
//   }
}
