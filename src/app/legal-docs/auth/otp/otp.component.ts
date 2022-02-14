import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthLegalService } from '../auth-legal.service';
import { SessionService } from 'src/app/tokens/session.service';
import { TokensService } from 'src/app/tokens/tokens.service';
import { NotificationService } from '../../notification/notification.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.sass'],
})
export class OtpComponent implements OnInit {
  public OTPForm: FormGroup;
  public Isworking: boolean = false;
  public errorMessages = {
    otp: [{ type: 'required', message: 'otp is required' }],
  };

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private session: SessionService,
    public TokensService: TokensService,
    private router: Router,
    private AuthLegal: AuthLegalService,
    private notifService: NotificationService
  ) {
    this.OTPForm = formBuilder.group({
      otp: ['', Validators.compose([Validators.required])],
      // recaptcha: ['', Validators.compose([
      //   Validators.required
      // ])]
    });
  }

  //set an otp timer display
  public timer: number = 0;
  public timerInterval: any;

  ngOnInit(): void {
    // create an otp timer of 10min
    //set an otp timer display
    this.timer = 10 * 60 * 1000;

    this.timerInterval = setInterval(() => {
      this.timer = this.timer - 1000;
      if (this.timer == 0) {
        //navigage to login page
        this.router.navigate(['/legal-docs/auth/email-validate']);
        clearInterval(this.timerInterval);
      }
    }, 1000);

    // redirect back to login page if timer is finished
  }

  get fControl() {
    return this.OTPForm.controls;
  }
  get otp() {
    return this.OTPForm.get('otp');
  }

  public convertMilliseconds(milliseconds: number) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return minutes + ":" + (+seconds < 10 ? "0" : "") + seconds;
  }

  onSubmit() {
    this.Isworking = true;
    this.AuthLegal.loginUser.otp = this.OTPForm.get('otp').value;
    this.AuthLegal.loginWithEmailOTP().subscribe(
      (res) => {
        if (res.success) {
          this.toastr.success('Login Successful', 'Success');
          this.session.setTrans_Legal(res);

          localStorage.setItem('sidebar', 'true'); //@TODO: setting true here
          sessionStorage.setItem('notificReqested', JSON.stringify(false));
          this.router
            .navigate(['/history'])
            .then(() => window.location.reload());
        }
      },
      (err) => {
        console.log(err);
        if (err.error.message.includes('Invalid')) {
          const [m1, m2, m3] = err.error.message.split(',');
          this.toastr.error(m2 + m3, 'Error');
        } else
          this.toastr.error("Something went wrong", 'Server error');
      }, () => {
        sessionStorage.removeItem('legal-email')
        this.Isworking = false;
      }
    );
  }
}
