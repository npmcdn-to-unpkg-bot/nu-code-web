import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, RepositoryService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(
      private route: ActivatedRoute,
      private repoService: RepositoryService) { }

  ngOnInit() {
    this.route.params.subscribe(
        params => {
          let id = params['id'];
          this.repoService.getUser(id).subscribe(user => this.user = user);
        });
  }

}
