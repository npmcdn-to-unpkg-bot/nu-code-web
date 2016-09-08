import 'jquery';
import 'bootstrap';

import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { LoginModalComponent } from './login-modal';
import { AuthService, LoginModalService, RepositoryService } from './shared';

@Component({
  moduleId: module.id,
  selector: 'app-root',
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
