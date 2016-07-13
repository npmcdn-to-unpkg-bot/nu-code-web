import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'app-problem-list',
  templateUrl: 'problem-list.component.html',
  styleUrls: ['problem-list.component.css']
})
export class ProblemListComponent implements OnInit {
  problems: FirebaseListObservable<any[]>;

  constructor(af: AngularFire) {
    this.problems = af.database.list('/problems');
  }

  ngOnInit() {
  }

}
