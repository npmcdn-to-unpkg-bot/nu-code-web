import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { AuthService, Problem, ProblemService, Submission } from '../shared';
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
  // Manipulated by editor. Set as a new object instance so as not to keep it in memory
  submission: Submission = {
    lang: DefaultSubmission.lang,
    src: DefaultSubmission.src,
    problem: DefaultSubmission.problem
  };

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private problemService: ProblemService,
      private authService: AuthService,
      private sharingService: SharingService) { }

  ngOnInit() {
    this.route.params.subscribe(
        params => {
          let id = params['id'];
          // Anytime the problem service's problem changes, change the sharing service's.
          this.problemService.getProblem(id).subscribe(
              problem => {
                this.problemName = problem.name;
                this.sharingService.problem = problem;
              });
        });
  }

  goToProblemsList() {
    this.router.navigateByUrl('/problems');
  }
}
