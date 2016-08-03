import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { LoginModalService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-login-required',
  templateUrl: 'login-required.component.html',
  styleUrls: ['login-required.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class LoginRequiredComponent implements OnInit {
  constructor(private loginModalService: LoginModalService) { }

  ngOnInit() {
  }
}
