import { Component, OnInit } from '@angular/core';
import { FaDirective } from 'angular2-fontawesome/directives';
import { AuthService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: ['reset-password.component.css'],
  directives: [FaDirective]
})
export class ResetPasswordComponent implements OnInit {
  email = '';
  state = 'Input';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  sendPasswordReset() {
    // this.state = 'Sending';
    this.authService.sendPasswordResetEmail(this.email).then(
        () => this.state = 'Sent',
        err => {
          console.log(err);
          this.state = 'Error';
        });
  }
}

type State = 'Input' | 'Sending' | 'Sent' | 'Error';
