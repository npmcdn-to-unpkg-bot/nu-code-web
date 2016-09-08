import 'jquery';
import 'bootstrap';

import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { AuthService, LoginModalService, RepositoryService } from './shared';
import { LoginModalComponent } from './login-modal';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  providers: [
    AuthService,
    LoginModalService,
    RepositoryService
  ],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('loginModal') loginModal: LoginModalComponent;

  constructor(
      // viewContainerRef is needed for angular2-bootstrap modals
      private viewContainerRef: ViewContainerRef,
      private authService: AuthService,
      private repoService: RepositoryService,
      private loginModalService: LoginModalService) { }

  ngOnInit() {
    this.loginModalService.shows
        .subscribe(() => this.loginModal.show());
  }
}
