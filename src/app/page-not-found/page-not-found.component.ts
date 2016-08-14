import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-page-not-found',
  templateUrl: 'page-not-found.component.html',
  styleUrls: ['page-not-found.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
