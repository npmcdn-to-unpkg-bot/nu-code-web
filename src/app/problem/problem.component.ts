import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { RepositoryService, Submission } from '../shared';
import { SharingService } from './shared';

const DefaultSubmission: Submission = {
  lang: 'c',
  src: '',
  problem: undefined
};

@Component({
  moduleId: module.id,
  selector: 'app-problem',
  templateUrl: 'problem.component.html',
  styleUrls: ['problem.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [SharingService]
})
export class ProblemComponent implements OnInit, OnDestroy {
  problemName: string;
  // Manipulated by editor. Set as a new object instance so as not to change the const
  submission: Submission = {
    lang: DefaultSubmission.lang,
    src: DefaultSubmission.src,
    problem: DefaultSubmission.problem
  };
  problemSubscription: Subscription;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private repoService: RepositoryService,
      private sharingService: SharingService) { }

  ngOnInit() {
    let problemId = this.route.snapshot.params['id'];
    // Anytime the problem service's problem changes, change the sharing service's.
    this.problemSubscription = this.repoService.getProblem(problemId).subscribe(
        problem => {
          this.problemName = problem.name;
          this.sharingService.problem = problem;
        });
    this.sharingService.submission = this.submission;
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
