import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/tokens/session.service';
import { TokensService } from 'src/app/tokens/tokens.service';
import { OKLoginTransC } from 'src/app/legal-docs/models/OkLogin';
import { OKLogin } from 'src/app/legal-docs/models/OkLogin';
import { NotificationService } from 'src/app/legal-docs/notification/notification.service';
import StateNotification from 'src/app/legal-docs/models/StateNotification';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {
  public breadcrumb: string = '';
  public time = new Date();
  public selectRole: number;
  public selectAuthority = 'Rate approval';
  showRoles: boolean = false;
  public roles: Array<any> = ['Rate approval', 'Transporter Invoices'];
  public roles_legal: Array<any> = ['admin', 'initiator']; //todo for legal docs
  public User_legal: OKLogin = new OKLoginTransC(); //todo for legal docs
  public notifc: StateNotification[] = [];
  public readProp: string;
  public activeNotif: StateNotification[];
  public cachedNotifParsed = [];
  public uiNotifLen: string;

  constructor(
    private router: Router,
    private session: SessionService,
    private token: TokensService,
    private notifsvc: NotificationService
  ) { }

  ngOnInit(): void {
    this.User_legal = Object.assign({}, this.session.getTrans_legal());

    console.log(this.User_legal);
    this.readProp = this.User_legal.role + '_read';

    setInterval(() => {
      this.time = new Date();
    }, 1000);
    let isAlreadyRequested = JSON.parse(
      sessionStorage.getItem('notificReqested')
    );
    if (!isAlreadyRequested) {
      console.log('here requesting fresh');
      this.notifsvc.getNotif().subscribe((res) => {
        this.notifc = res.message;
        console.log(this.notifc);
        sessionStorage.setItem('notificReqested', 'true');
        sessionStorage.setItem('cachedNotif', JSON.stringify(this.notifc));
        this.notifc.length > 9
          ? (this.uiNotifLen = '9+')
          : (this.uiNotifLen = this.notifc.length.toString());
      });
    } else {
      console.log('here requesting cached');
      this.cachedNotifParsed = JSON.parse(
        sessionStorage.getItem('cachedNotif')
      );
      this.notifc = this.cachedNotifParsed;
    }
    this.notifc.length > 9
      ? (this.uiNotifLen = '9+')
      : (this.uiNotifLen = this.notifc.length.toString());
  }
  logout() {
    this.token.deleteToken().subscribe((res) => { });
    this.session.destroy();
    localStorage.removeItem('sidebar');
    localStorage.removeItem('notificReqested');
    localStorage.removeItem('cachedNotif');
    console.log(this.session.getTrans_legal());
    this.router.navigate(['/legal-docs/auth/email-validate']);
  }

  removeNotifById(id) {
    this.notifc = this.notifc.filter((notif) => notif.id !== id);
    this.uiNotifLen = (+this.uiNotifLen - 1).toString()
    console.log('removed after', this.notifc);
  }

  readNotif(id) {
    this.notifsvc.readNotification(id).subscribe((res) => {
      let i = this.notifc.findIndex((x) => x.id === id);
      console.log('index', i);
      this.notifc[i][this.readProp] = true;
      console.log('after mutation', this.notifc[i]);
      this.removeNotifById(id);
      sessionStorage.setItem('cachedNotif', JSON.stringify(this.notifc));
      // this.remot
    });
  }
}