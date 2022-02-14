import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SessionService } from 'src/app/tokens/session.service';
import { environment } from 'src/environments/environment';
import StateNotification from '../models/StateNotification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  filteredNotif: StateNotification[] = [];
  allNotif: Subject<StateNotification[]> = new Subject();
  notifApi = environment.legal_api + '/notification/';

  constructor(private http: HttpClient, private ssn: SessionService) {
    this.allNotif.subscribe((val) => {
      this.filteredNotif = val;
    });
  }

  getNotifications() {
    let user_id = this.ssn.getTrans_legal().loginId.toString();
    let role = this.ssn.getTrans_legal().role;
    this.http
      .get(this.notifApi, {
        params: {
          user_id,
          role,
        },
      })
      .subscribe((res) => {
        this.allNotif.next(res['message']);
      });
  }

  getNotif(): Observable<any> {
    {
      let user_id = this.ssn.getTrans_legal().loginId.toString();
      let role = this.ssn.getTrans_legal().role;
      return this.http.get(this.notifApi, {
        params: {
          user_id,
          role,
        },
      });
    }
  }

  readNotification(id) {
    let user_id = this.ssn.getTrans_legal().loginId.toString();
    let role = this.ssn.getTrans_legal().role;
    return this.http.post(
      this.notifApi,
      {
        role,
        remark_id: id,
      },
      {
        params: {
          user_id,
        },
      }
    );
  }
}

// export class SidebarService {
//   isSidebarVisible: boolean;

//   sidebarVisibilityChange: Subject<boolean> = new Subject<boolean>();

//   constructor()  {
//       this.sidebarVisibilityChange.subscribe((value) => {
//           this.isSidebarVisible = value
//       });
//   }

//   toggleSidebarVisibility() {
//       this.sidebarVisibilityChange.next(!this.isSidebarVisible);
//   }
// }
