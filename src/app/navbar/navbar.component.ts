import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  providers: [AuthService]
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  navigate(path: string): Promise<boolean> {
    return this.router.navigateByUrl(path);
  }

  logIn(): void {
    this.authService.logInWithEmailPassword('tberry@student.neumont.edu', 'samplepassword');
  }

  logOut(): void {
    this.authService.logOut();
  }

}
