import { Component, OnInit } from '@angular/core';
import { FaDirective } from 'angular2-fontawesome/directives';
import { AuthService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-verification-required',
  templateUrl: 'verification-required.component.html',
  styleUrls: ['verification-required.component.css'],
  directives: [FaDirective]
})
export class VerificationRequiredComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
