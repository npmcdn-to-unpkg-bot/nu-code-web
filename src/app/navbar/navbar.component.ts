import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AuthAreaComponent } from './auth-area';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    AuthAreaComponent
  ]
})
export class NavbarComponent { }
