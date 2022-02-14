import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import NewUser from '../models/NewUser';
import LoginUser from '../models/LoginUser';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import OkRegistration from '../models/OkRegistration';
import OkEmail from '../models/OkEmail';
import { OKLogin } from '../models/OkLogin';
import { SessionService } from 'src/app/tokens/session.service';
'../models/OkEmail';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthLegalService {
  private api = environment.legal_api
  private registerURL = this.api + "/register/";
  private loginURL = this.api + '/login/';
  private checkEmailURL = this.api + "/otp/"

  public loginUser: LoginUser = {
    email: '',
    otp: '',
  }
  constructor(private http: HttpClient, private ssn: SessionService) { }

  checkEmailExists(email: any): Observable<OkEmail> {
    return this.http.post<OkEmail>(this.checkEmailURL, email, httpOptions)

  }

  loginWithEmailOTP(): Observable<OKLogin> {
    if (!this.loginUser.email)
      this.loginUser.email = sessionStorage.getItem('legal-email')
    return this.http.post<OKLogin>(this.loginURL, this.loginUser, httpOptions)
  }

  registerUser(user: NewUser): Observable<OkRegistration> {
    let csMemUser = this.ssn.getTrans_legal()
    return this.http.post<OkRegistration>(this.registerURL, user, {
      params: {
        user_id: String(this.ssn.getTrans_legal().loginId),
        role: csMemUser.role,
      }
    })
  }

  getHOD(department: string, uid?: Number): Observable<any> {
    return this.http.get(this.api + "/gethod/" + department, {
      params: {
        user_id: String(uid),
      }
    })
  }
  getDept(): Observable<any> {
    return this.http.get(this.api + '/dept-name/')
  }
}
