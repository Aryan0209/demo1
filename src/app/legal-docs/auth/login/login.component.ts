import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthLegalService } from "../auth-legal.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"],
})
export class LoginComponent implements OnInit {
  public EmailForm: FormGroup;
  public isWorking: boolean = false;
  public Isworking: boolean = false;
  public errorMessages = {
    email: [{ type: "required", message: "Email is required" }],
  };

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private AuthLegal: AuthLegalService
  ) {
    this.EmailForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      // recaptcha: ['', Validators.compose([
      //   Validators.required
      // ])]
    });
  }

  ngOnInit(): void { }

  get fControl() {
    return this.EmailForm.controls;
  }
  get email() {
    return this.EmailForm.get("email");
  }

  onSubmit() {
    this.AuthLegal.loginUser.email = this.EmailForm.get("email").value;
    this.Isworking = true;
    this.AuthLegal.checkEmailExists(this.EmailForm.value).subscribe(async (res) => {
      if (res.message.includes("Mail has been sent ")) {
        sessionStorage.setItem("legal-email", this.EmailForm.get("email").value);
        this.toastr.success("Please check your email", "OTP sent");
        console.log("hererere")
        // route to otp-verify page
        this.router.navigate(["/legal-docs/auth/otp-verify"]);
      } else {
        this.toastr.error(res.message, "Please register first");
      }
    }, err => {
      this.toastr.error(err.message, "Server error");
    }, () => this.Isworking = false);
  }


}
