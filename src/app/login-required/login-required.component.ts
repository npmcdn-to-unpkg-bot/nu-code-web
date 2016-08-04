import { Component, OnInit } from '@angular/core';
import { FaDirective } from 'angular2-fontawesome/directives';
import { LoginModalService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-login-required',
  templateUrl: 'login-required.component.html',
  styleUrls: ['login-required.component.css'],
  directives: [FaDirective]
})
export class LoginRequiredComponent implements OnInit {
  constructor(private loginModalService: LoginModalService) { }

  ngOnInit() {
  }
}
