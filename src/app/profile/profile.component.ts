import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { FaDirective } from 'angular2-fontawesome/directives';
import { AuthService, RepositoryService, User } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    FaDirective
  ]
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private authService: AuthService,
      private repoService: RepositoryService) { }

  ngOnInit() {
    this.route.params.subscribe(
        params => {
          let id = params['id'];
          this.repoService.getUser(id).subscribe(user => {
            if (user) {
              this.user = user;
            } else {
              this.router.navigateByUrl('/');
            }
          });
        });
  }

  isMyProfile(): boolean {
    return this.user && this.authService.user
        && this.user.$key === this.authService.user.$key;
  }
}
