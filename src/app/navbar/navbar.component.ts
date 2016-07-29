import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAreaComponent } from './auth-area';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  directives: [AuthAreaComponent]
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate(path: string): Promise<boolean> {
    return this.router.navigateByUrl(path);
  }

}
