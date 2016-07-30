import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  BS_VIEW_PROVIDERS,
  MODAL_DIRECTIVES,
  ModalDirective
} from 'ng2-bootstrap/ng2-bootstrap';
import { AuthService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-login-modal',
  templateUrl: 'login-modal.component.html',
  styleUrls: ['login-modal.component.css'],
  directives: [MODAL_DIRECTIVES],
  viewProviders: [BS_VIEW_PROVIDERS]
})
export class LoginModalComponent implements OnInit {
  @ViewChild('modal') modal: ModalDirective;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  handleLogin(): void {
    this.modal.show();
  }

  logInWithEmailPassword(): void {
    // Show spinner
    this.authService.logInWithEmailPassword('tberry@student.neumont.edu', 'samplepassword').then(
        () => this.modal.hide(),
        err => console.log(err));
  }

}
