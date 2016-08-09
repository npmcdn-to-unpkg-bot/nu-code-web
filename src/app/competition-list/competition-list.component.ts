import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { FaDirective } from 'angular2-fontawesome/directives';
import { AuthService, RepositoryService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-competition-list',
  templateUrl: 'competition-list.component.html',
  styleUrls: ['competition-list.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    FaDirective
  ]
})
export class CompetitionListComponent implements OnInit {
  canCreateCompetition: boolean;

  constructor(
      private authService: AuthService,
      private repoService: RepositoryService) {}

  ngOnInit() {
    this.authService.isNeumonter
        .subscribe(isNeumonter => this.canCreateCompetition = isNeumonter);
  }
}
