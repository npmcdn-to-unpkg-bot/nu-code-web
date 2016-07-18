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
  // TODO: can this be const?
  CharacterLimit = 100000;

  problem: Problem;
  currentTab: Tab;

  sourceCode: string;

  // A connection opened in ngOnInit(), closed in ngOnDestroy()
  private subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private problemService: ProblemService) {}

  ngOnInit() {
    this.currentTab = Tab.Problem;
    this.subscription = this.route
      .params
      .subscribe(params => {
        let id = params['id'];
        // TODO: grab which tab from route data
        this.problemService.getProblem(id)
          .subscribe(problem => {
            // TODO: could use some more elegant validation that the problem exists
            if (problem.name) {
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

  isCurrentTab(tab: string): boolean {
    return this.currentTab == Tab[tab];
  }

  goToProblemTab(): void {
    this.currentTab = Tab.Problem;
  }

  goToMySubmissionsTab(): void {
    this.currentTab = Tab.MySubmissions;
  }

  goToLeaderboardTab(): void {
    this.currentTab = Tab.Leaderboard;
  }

  goToProblemsList() {
    this.router.navigate(['/problems']);
  }

  numChars() {
    return this.sourceCode ? this.sourceCode.length : 0;
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

enum Tab {
  Problem,
  MySubmissions,
  Leaderboard
}
