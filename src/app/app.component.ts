import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NavbarComponent } from './navbar';
import { LoginModalComponent } from './login-modal';
import { AuthService, LoginModalService } from './shared';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    NavbarComponent,
    LoginModalComponent
  ],
  providers: [LoginModalService]
})
export class AppComponent implements OnInit {
  @ViewChild('loginModal') loginModal: LoginModalComponent;

  constructor(
      // viewContainerRef is needed for angular2-bootstrap modals
      private viewContainerRef: ViewContainerRef,
      private authService: AuthService,
      private loginModalService: LoginModalService) { }

  ngOnInit() {
    this.loginModalService.shows.subscribe(
        () => this.loginModal.show());
  }
}
