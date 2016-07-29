import { Component, ViewContainerRef } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AuthService, ProblemService, UserService } from './shared';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    HTTP_PROVIDERS,
    AuthService,
    ProblemService,
    UserService
  ]
})
export class AppComponent {
  constructor(
    // viewContainerRef is needed for angular2-bootstrap modals
    private viewContainerRef: ViewContainerRef,
    private authService: AuthService) { }

  logIn(): void {
    this.authService.logInWithEmailPassword('tberry@student.neumont.edu', 'samplepassword');
  }

  logOut(): void {
    this.authService.logOut();
  }
}
