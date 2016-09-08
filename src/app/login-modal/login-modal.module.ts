import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'ng2-bootstrap';
import { FaDirective } from 'angular2-fontawesome/directives';

import { LoginModalComponent } from './login-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ModalModule
  ],
  declarations: [
    FaDirective,
    LoginModalComponent
  ],
  exports: [LoginModalComponent]
})
export class LoginModalModule { }
