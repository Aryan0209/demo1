import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TesterComponent } from 'src/app/tester/tester.component';
import { RegistrationLegalComponent } from './registration-legal/registration-legal.component';


@NgModule({
  declarations: [LoginComponent, OtpComponent, TesterComponent, RegistrationLegalComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
