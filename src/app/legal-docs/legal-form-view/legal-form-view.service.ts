import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { throttle } from 'rxjs/operators';
import { SessionService } from 'src/app/tokens/session.service';
import { environment } from 'src/environments/environment';
import { CsTeamMember } from '../models/CSTeamMember';
import LegalFormDetails from '../models/LegalFormDetails';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class LegalFormViewService {
  private url = environment.legal_api + "/legaldocformview/";
  updateUrl = environment.legal_api + '/legaldocform/'
  remarkLogURL = environment.legal_api + '/doclog/'
  csmemberUrl = environment.legal_api + '/getcs/CS/'
  closureApi = environment.legal_api + '/document/'
  attachReconApi = environment.legal_api + '/reconsider-optional/';
  userRole = this.ssn.getTrans_legal().role
  public User = this.ssn.getTrans_legal()

  constructor(
    private http: HttpClient,
    private ssn: SessionService
  ) { }

  getDetail(id: Number, uid): Observable<LegalFormDetails[]> {
    return this.http.get<LegalFormDetails[]>(this.url + id, {
      params: {
        user_id: String(uid)
      }
    });
  }

  isRole = (r: "hod1" | "hod2" | "cs_member") => (this.userRole === r)

  getRemarkLog(userable_doc_id, st, uid): Observable<any> {
    // console.warn('requesting logs')

    return this.http.get<any>(this.remarkLogURL + userable_doc_id, {
      params: {
        state: st,
        user_id: String(uid)
      }
    })
  }

  attachClosureDoc(data, uid): Observable<any> {  //approves with attachments and remarks
    return this.http.put<any>(this.closureApi, data, {
      params: {
        user_id: String(uid),

      }
    })
  }
  reconWithAttach(data, uid, formId): Observable<any> {  //approves with attachments and remarks
    return this.http.post<any>(this.attachReconApi, data)
  }
  getCSMembers(uid) {
    return this.http.get<CsTeamMember[]>(this.csmemberUrl, {
      params: {
        user_id: String(uid)
      }
    })
  }

  changeDocStatus(doc_id, state: Number, remarks, username, main_status, csMemberId, uid): Observable<any> { //changing status
    let user_Role = this.ssn.getTrans_legal().role
    console.warn("put request called as", this.updateUrl + doc_id + "/", {
      status: main_status,
      state,
      remark: remarks,
      remark_by: username,
      role: user_Role,
      cs_member_id: csMemberId,
    }, {
      params: {
        user_id: String(uid)
      }
    })
    return this.http.put(this.updateUrl + doc_id + "/", {
      status: main_status,
      state,
      remark: remarks,
      remark_by: username,
      role: user_Role,
      cs_member_id: csMemberId,
    }, {
      params: {
        user_id: String(uid)
      }
    }
    )
  }
}