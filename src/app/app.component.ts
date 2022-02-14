import { Component, OnInit } from '@angular/core';
import { OKLoginTransC } from './legal-docs/models/OkLogin';
import { SessionService } from './tokens/session.service';
import { OKLogin } from './legal-docs/models/OkLogin';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  //  public currentUser: Users = new UsersC();
  title = 'Legal Documents module';
  public currentUser_legal: OKLogin = new OKLoginTransC(); // todo FOR LEGAL DOCS
  public isLoggedIn$: Observable<boolean>;
  public menuToggle: boolean
  public showSidebar: boolean

  constructor(private session: SessionService) {

    this.session.getObserve_legal().subscribe(res => this.showSidebar = res.success)
    // todo FOR LEGAL DOCS
    this.session.getObserve_legal().subscribe((user_legal: OKLogin) => { this.currentUser_legal = user_legal })
    // this.session.getObserve().subscribe((users: Users) => { this.currentUser = users; });

    // checks for already login


    // todo FOR LEGAL DOCS
    this.currentUser_legal = sessionStorage.getItem('legal_userdata') == null ? new OKLoginTransC : JSON.parse(sessionStorage.getItem('legal_userdata'))

    // this.currentUser = sessionStorage.getItem("userdata") == null ? new UsersC() : JSON.parse(sessionStorage.getItem("userdata"));
    this.session.setTrans_Legal(this.currentUser_legal) //todo FOR LEGAL DOCS
    // this.session.set(this.currentUser);


  }

  ngOnInit() {
    console.log("version 18.3-test")
    this.isLoggedIn$ = this.session.isLoggedIn;
    if (localStorage.getItem('menuToggle') !== null) {
      this.menuToggle = JSON.parse(localStorage.getItem('sidebar'))
    } else {
      this.menuToggle = true
      localStorage.setItem('menuToggle', JSON.stringify(this.menuToggle))
    }

  }


}
