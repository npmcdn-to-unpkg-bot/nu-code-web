import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Problem } from '../shared/problem';
import { ProblemPreviewComponent } from '../problem-preview';

@Component({
  moduleId: module.id,
  selector: 'app-problem-list',
  templateUrl: 'problem-list.component.html',
  styleUrls: ['problem-list.component.css'],
  directives: [ProblemPreviewComponent]
})
export class ProblemListComponent implements OnInit {
  problems: FirebaseListObservable<Problem[]>;

  constructor(af: AngularFire) {
    this.problems = af.database.list('/problems');
  }

  ngOnInit() {
  }

}
