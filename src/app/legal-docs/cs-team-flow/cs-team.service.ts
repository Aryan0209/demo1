import { Injectable } from '@angular/core';
import { SessionService } from 'src/app/tokens/session.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsTeamService {
  memberId: Number;
  csTodoApi: string = environment.legal_api + '/tododoc/'
  csResponseApi: string = environment.legal_api + '/document/'
  private reconApi = environment.legal_api + "/reconsider/"

  constructor(private ssn: SessionService, private http: HttpClient) {
    this.memberId = this.ssn.getTrans_legal().loginId
  }

  getCsTodos(uid: Number): Observable<any> {  //gets all css todoos
    return this.http.get<any>(this.csTodoApi + 1 + '/', {
      params: {
        cs_member_id: String(uid),
        state: "3",
        requester_role: "cs_member",
        requester_id: String(uid)
      }
    })
  }

  getCsRecon(uid: Number): Observable<any> {
    return this.http.get<any>(this.csTodoApi + 1 + '/', {
      params: {
        cs_member_id: String(uid),
        state: "22",
        requester_role: "cs_member",
        requester_id: String(uid)
      }
    })
  }

  getCsApp(uid: Number): Observable<any> {

    return this.http.get<any>(this.csTodoApi + 1 + '/', {
      params: {
        cs_member_id: String(uid),
        state: "13",
        requester_role: "cs_member",
        requester_id: String(uid)
      }
    })
  }

  getDocClosured(uid: Number): Observable<any> {

    return this.http.get<any>(this.csTodoApi + 2 + '/', {
      params: {
        cs_member_id: String(uid),
        state: "14",
        requester_role: "cs_member",
        requester_id: String(uid)
      }
    })
  }

  getCsSubmitted(uid: Number): Observable<any> {
    return this.http.get<any>(this.csTodoApi + 1 + '/', {
      params: {
        cs_member_id: String(uid),
        state: "11",
        requester_role: "cs_member",
        requester_id: String(uid)
      }
    })
  }
  getCsInitApprovedDrafts(uid: Number): Observable<any> {
    return this.http.get<any>(this.csTodoApi + 1 + '/', {
      params: {
        cs_member_id: String(uid),
        state: "12",
        requester_role: "cs_member",
        requester_id: String(uid)
      }
    })
  }

  approveCsTodo(data, uid: Number): Observable<any> {  //approves with attachments and remarks
    console.log(data)
    return this.http.put<any>(this.csResponseApi, data, {
      params: {
        user_id: String(uid)
      },
    })
  }

  respondTorecon(formId: String, formdata, uid: Number): Observable<any> {  //reconsider --
    return this.http.post<any>(this.reconApi + formId + '/', formdata, {
      params: {
        user_id: String(uid)
      }
    })
  }

}
