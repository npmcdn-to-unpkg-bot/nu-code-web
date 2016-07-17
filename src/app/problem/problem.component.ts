import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Problem, ProblemService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-problem',
  templateUrl: 'problem.component.html',
  styleUrls: ['problem.component.css']
})
export class ProblemComponent implements OnInit, OnDestroy {
  problem: Problem;

  // A connection opened in ngOnInit(), closed in ngOnDestroy()
  private subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private problemService: ProblemService) {}

  ngOnInit() {
    this.subscription = this.route
      .params
      .subscribe(params => {
        let id = +params['id'];
        this.problemService.getProblem(id)
          .subscribe(problem => {
            if (problem) {
              this.problem = problem;
            } else {
              this.goToProblemsList();
            }
          })
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  goToProblemsList() {
    this.router.navigate(['/problems']);
  }

  // // TODO: incorporate the passing along of id into `goToProblemsList`
  // gotoCrises() {
  //   let crisisId = this.crisis ? this.crisis.id : null;
  //   // Pass along the hero id if available
  //   // so that the CrisisListComponent can select that hero.
  //   // Add a totally useless `foo` parameter for kicks.
  //   // Absolute link
  //   this.router.navigate(['/crisis-center', {id: crisisId, foo: 'foo'}]);
  // }
}
