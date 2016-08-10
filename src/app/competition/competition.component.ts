import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-competition',
  templateUrl: 'competition.component.html',
  styleUrls: ['competition.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class CompetitionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
