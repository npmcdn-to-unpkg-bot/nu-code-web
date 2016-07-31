import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-my-submissions',
  templateUrl: 'my-submissions.component.html',
  styleUrls: ['my-submissions.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class MySubmissionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
