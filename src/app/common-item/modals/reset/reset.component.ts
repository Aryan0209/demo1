import { Component, OnInit ,Output, EventEmitter,} from '@angular/core';
import { TokensService } from 'src/app/tokens/tokens.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {ResetPassword, ResetPasswordC} from 'src/app/tokens/tokens';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.sass']
})

export class ResetComponent implements OnInit {
  public ResetPassword: ResetPassword = new ResetPasswordC();
  @Output() messageEvent = new EventEmitter<string>();
  public isSubmitted : boolean = false;
  public isWorking: boolean = false;

  constructor(
    private toastr: ToastrService,
    public TokensService: TokensService,
    public bsModalRef: BsModalRef) {  }
    public currentPass: boolean = false;
    public newPass: boolean = false;

  ngOnInit(): void { 
    
  }
  cancel() {
    this.messageEvent.emit("");
    this.bsModalRef.hide();
  }
  checkPassword(){
    if(this.ResetPassword.newpassword != this.ResetPassword.confirmpassword){
      this.ResetPassword.confirmpassword = "";
    }
  }
  ChangePassword(f) {
    if(f.valid){
      this.isWorking = true;
    this.TokensService.newpass(this.ResetPassword).subscribe(res => {
    this.isWorking = false;
    this.toastr.success('', 'Password Changed Successfully!');
    }, err => {
    this.isWorking = false;
      this.toastr.error('Check your credentials', 'Request Unsuccessfully!');
    });
    this.messageEvent.emit("");
    this.bsModalRef.hide();
    }
    else {
      this.isWorking = false;
      this.isSubmitted = true;
    }
  }
}