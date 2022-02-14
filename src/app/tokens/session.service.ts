import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { UsersTrans, Users, UsersC } from '../users/users';
import { UsersTransC } from 'src/app/users/users';
import { OKLogin, OKLoginTransC } from "../legal-docs/models/OkLogin"

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private subjectUser = new Subject<Users>();
  private subjectUser1 = new Subject<UsersTrans>();
  public subjectUser_Legal = new Subject<OKLogin>()
  private usersObj: Users;
  private usersObj1: UsersTrans;
  public loggedIn = new BehaviorSubject<boolean>(false); // {1}
  private legal_usersObj;
  private legal_usersObj1: OKLogin  //TODO FOR LEGAL DOCS

  constructor() { }

  public get(): Users {
    return this.usersObj ? this.usersObj : new UsersC();
  }
  public getTrans(): UsersTrans {
    return this.usersObj1 ? this.usersObj1 : new UsersTransC();
  }

  //todo for legal docs
  public getTrans_legal(): OKLogin {
    return this.legal_usersObj1 ? this.legal_usersObj1 : new OKLoginTransC()
  }


  get isLoggedIn() {
    console.log("isLog from session service", this.loggedIn.value);
    return this.loggedIn.asObservable(); // {2}
  }
  // public set(obj: Users){
  //   this.usersObj = new UsersC(obj);
  //   this.subjectUser.next(this.usersObj);
  //   sessionStorage.setItem("userdata" , JSON.stringify(this.usersObj));
  // }
  public setTrans(obj: UsersTrans) {
    //  console.log(obj);
    this.usersObj1 = new UsersTransC(obj);
    //  console.log(this.usersObj1);
    // this.subjectUser1.next(this.usersObj1);
    sessionStorage.setItem("userdata", JSON.stringify(this.usersObj1));
  }

  //TODO FOR LEGAL DOCS =-=--==-==-=-=-==-=---=-=
  public setTrans_Legal(obj: OKLogin) {
    this.legal_usersObj1 = new OKLoginTransC(obj)

    this.subjectUser_Legal.next(this.legal_usersObj1);
    sessionStorage.setItem("legal_userdata", JSON.stringify(this.legal_usersObj1))
    console.log(sessionStorage.getItem("legal_userdata"))
    this.loggedIn.next(true);
  }


  public destroy() {
    this.legal_usersObj1 = new OKLoginTransC();

    this.subjectUser_Legal.next(this.legal_usersObj1);
    sessionStorage.removeItem("legal_userdata");
    this.loggedIn.next(false);

  }

  public getObserve(): Observable<UsersTrans> {
    return this.subjectUser1.asObservable();
  }

  public getObserve_legal(): Observable<OKLogin> {
    return this.subjectUser_Legal.asObservable();
  }

}
