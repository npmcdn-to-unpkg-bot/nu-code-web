import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ProblemService, UserService } from './shared';
import { AlertComponent } from 'ng2-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    HTTP_PROVIDERS,
    ProblemService,
    UserService
  ]
})
export class AppComponent {
}
