import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { RepositoryService, Submission, SubmissionTemplateService } from '../shared';
import { SharingService } from './shared';

@Component({
  moduleId: module.id,
  selector: 'app-problem',
  templateUrl: 'problem.component.html',
  styleUrls: ['problem.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    SubmissionTemplateService,
    SharingService
  ]
})
export class ProblemComponent implements OnInit, OnDestroy {
  problemName: string;
  // Manipulated by editor. Set as a new object instance so as not to change the const
  // submission: Submission;
  problemSubscription: Subscription;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private repoService: RepositoryService,
      private templateService: SubmissionTemplateService,
      private sharingService: SharingService) { }

  ngOnInit() {
    let problemId = this.route.snapshot.params['id'];

    // Anytime the problem service's problem changes, change the sharing service's.
    this.problemSubscription = this.repoService.getProblem(problemId).subscribe(
        problem => {
          this.problemName = problem.name;
          this.sharingService.problem = problem;
        });
    // Load in the template
    this.templateService
        .getDefaultSubmission()
        .take(1)
        .subscribe(defaultSubmission => this.sharingService.submission = defaultSubmission);
  }

  ngOnDestroy() {
    if (this.problemSubscription) {
      this.problemSubscription.unsubscribe();
    }
  }

  goToProblemsList() {
    this.router.navigateByUrl('/problems');
  }
}
