import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { AuthService, RepositoryService, Submission } from '../shared';
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
export class ProblemComponent implements OnInit {
  problemName: string;
  // Manipulated by editor. Set as a new object instance so as not to change the const
  submission: Submission = {
    lang: DefaultSubmission.lang,
    src: DefaultSubmission.src,
    problem: DefaultSubmission.problem
  };

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private repoService: RepositoryService,
      private authService: AuthService,
      private sharingService: SharingService) { }

  ngOnInit() {
    this.route.params.subscribe(
        params => {
          let id = params['id'];
          // Anytime the problem service's problem changes, change the sharing service's.
          this.repoService.getProblem(id).subscribe(
              problem => {
                this.problemName = problem.name;
                this.sharingService.problem = problem;
              });
        });
    this.sharingService.submission = this.submission;
  }

  goToProblemsList() {
    this.router.navigateByUrl('/problems');
  }
}
