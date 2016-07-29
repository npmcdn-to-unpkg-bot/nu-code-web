import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-auth-area',
  templateUrl: 'auth-area.component.html',
  styleUrls: ['auth-area.component.css'],
  providers: [AuthService]
})
export class AuthAreaComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  logIn(): void {
    this.authService.logInWithEmailPassword('tberry@student.neumont.edu', 'samplepassword');
  }

  logOut(): void {
    this.authService.logOut();
  }

}
