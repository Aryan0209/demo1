import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { SessionService } from "src/app/tokens/session.service";
import NewUser from "../../models/NewUser";
import { AuthLegalService } from "../auth-legal.service";

@Component({
  selector: "app-registration-legal",
  templateUrl: "./registration-legal.component.html",
  styleUrls: ["./registration-legal.component.sass"],
})
export class RegistrationLegalComponent implements OnInit {
  public RegistrationForm: FormGroup;
  public showHODField: boolean = true;
  public hodDetails: [];
  public subscription: Subscription;
  public CS_AUTH_ID: number;
  public departments: any[];

  constructor(
    private Auth: AuthLegalService,
    private toastr: ToastrService,
    private router: Router,
    private fB: FormBuilder,
    private Session: SessionService
  ) {}

  ngOnInit(): void {
    this.RegistrationForm = this.fB.group({
      firstname: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(25),
          Validators.pattern("^[a-zA-Z ]*$"),
        ]),
      ],
      lastname: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(25),
          Validators.pattern("^[a-zA-Z ]*$"),
        ]),
      ],
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(
            "^(?=.{3,25}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
          ),
        ]),
      ],
      mobile: [
        "",
        Validators.compose([
          Validators.pattern(
            "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
          ),
        ]),
      ],
      department: ["", Validators.compose([Validators.required])],
      emp_code: ["", Validators.compose([Validators.required])],
      role: ["", Validators.compose([Validators.required])],
      hod: [null, Validators.compose([])],
    });
    this.formControlValueChanged();
    this.departmentValueChanged();
    this.CS_AUTH_ID = this.Session.getTrans_legal().loginId;
    this.populateHOD();
  }

  formControlValueChanged() {
    this.RegistrationForm.get("role").valueChanges.subscribe((role: string) => {
      if (["3", "4"].includes(role)) {
        this.showHODField = false;
      } else {
        this.showHODField = true;
        let dep = this.RegistrationForm.get("department").value;
        this.Auth.getHOD(dep, this.CS_AUTH_ID).subscribe((res) => {
          res.sort((a, b) => a.name_of_department > b.name_of_department);
          this.hodDetails = res;
          console.log(this.hodDetails);
        });
      }
    });
  }
  departmentValueChanged() {
    let CS_AUTH_ID = this.Session.getTrans_legal().loginId;
    this.RegistrationForm.get("department").valueChanges.subscribe(
      (dep: string) => {
        if (this.showHODField && dep.length) {
          this.Auth.getHOD(dep, CS_AUTH_ID).subscribe((res) => {
            res.sort((a, b) => a.name_of_department > b.name_of_department);
            console.log(res);
            this.hodDetails = res;
            console.log(this.hodDetails);
          });
        }
      }
    );
  }

  get fControl() {
    return this.RegistrationForm.controls;
  }
  get role() {
    return this.RegistrationForm.get("role");
  }

  onSubmit(newuser: NewUser) {
    let formValue = { ...this.RegistrationForm.getRawValue() };
    formValue["email"] =
      this.RegistrationForm.get("email").value + "@solargroup.com";
    console.log(formValue);
    // console.log(formValue);
    this.Auth.registerUser(formValue).subscribe(
      (response) => {
        if (response.message.includes("User Added Successfully")) {
          this.toastr.success(
            "Registration Successful",
            "Welcome, you can now log in"
          );
        }
        this.router.navigate(["/history"]);
      },
      (err) => {
        if (err.error.message.includes("User already exists")) {
          this.toastr.error("User already exists", "Please try again");
        }
      }
    );
  }

  getFormValidationErrors($event) {
    Object.keys(this.RegistrationForm.controls).forEach((key) => {
      const controlErrors: ValidationErrors =
        this.RegistrationForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          console.log(
            "Key control: " + key + ", keyError: " + keyError + ", err value: ",
            controlErrors[keyError]
          );
        });
      }
    });
  }

  populateHOD() {
    this.Auth.getDept().subscribe(
      (res) => {
        res.sort((a, b) => a.name_of_department > b.name_of_department);
        this.departments = res;
        console.warn(res);
      },
      (err) => this.toastr.error("Error fetching departments")
    );
  }

  warnValidation($event) {
    console.log("here");
    if (this.RegistrationForm.invalid)
      this.toastr.warning(
        "Please fill all required fields correctly",
        "Warning"
      );
  }
}
