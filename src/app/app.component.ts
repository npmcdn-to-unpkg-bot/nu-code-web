import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NavbarComponent } from './navbar';
import { LoginModalComponent } from './login-modal';
import { AuthService, LoginModalService, RepositoryService } from './shared';
import { AppRouterProviders } from './app.routes';

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
  providers: [
    AppRouterProviders,
    HTTP_PROVIDERS,
    AuthService,
    LoginModalService,
    RepositoryService
  ]
})
export class AppComponent implements OnInit {
  @ViewChild('loginModal') loginModal: LoginModalComponent;

  constructor(
      // viewContainerRef is needed for angular2-bootstrap modals
      private viewContainerRef: ViewContainerRef,
      private loginModalService: LoginModalService) { }

  ngOnInit() {
    this.loginModalService.shows.subscribe(
        () => this.loginModal.show());
  }
}
