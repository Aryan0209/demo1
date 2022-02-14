import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { OtpComponent } from "./otp/otp.component";
import { RegistrationLegalComponent } from "./registration-legal/registration-legal.component";

const routes: Routes = [
  {
    path: "email-validate",
    component: LoginComponent,
  },
  {
    path: "otp-verify",
    component: OtpComponent,
  },
  {
    path: "register",
    component: RegistrationLegalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
