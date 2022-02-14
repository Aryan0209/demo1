import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/tokens/session.service';
import { environment } from 'src/environments/environment';
import { DocumentTypes } from '../models/DocumentTypes';
import { PartyName } from '../models/PartyName';


@Injectable({
  providedIn: 'root'
})


export class InitiatorService {

  private formApi = environment.legal_api + "/document/"
  private reconApi = environment.legal_api + "/reconsider/"
  private partyApi = environment.legal_api + "/getpartyname/"
  private docTypesApi = environment.legal_api + "/getdoctype/"
  private api = environment.legal_api
  private renewUrl = environment.legal_api + '/renewform/'

  constructor(private http: HttpClient, private ssn: SessionService) { }

  getHOD(department: string, uid?: Number): Observable<any> {
    return this.http.get(this.api + "/gethod/" + department, {
      params: {
        user_id: String(uid),
        userId: String(uid)
      }
    })
  }
  submitInitatorForm(formFilled: Object, uid): Observable<any> {
    let user_id = this.ssn.getTrans_legal().loginId
    return this.http.post(this.formApi, formFilled, {
      params: {
        user_id: String(user_id)
      }
    })
  }

  renewForm(newformdata) {
    let user_id = this.ssn.getTrans_legal().loginId
    return this.http.post(this.renewUrl, newformdata, {
      params: {
        user_id: String(user_id)
      }
    })
  }

  reconsiderSubmit(formReconData: FormData, formId: Number, uid) {
    let user_id = this.ssn.getTrans_legal().loginId
    console.log(formReconData)
    return this.http.post(this.reconApi + formId + '/', formReconData)
  }

  getParties() {
    let user_id = this.ssn.getTrans_legal().loginId
    return this.http.get<PartyName[]>(this.partyApi, {
      params: {
        user_id: String(user_id)
      }
    })
  }
  addParty(newParty) {
    console.log(newParty)
    let user_id = this.ssn.getTrans_legal().loginId
    return this.http.post<{ message: string }>(this.partyApi, newParty, {
      params: {
        user_id: String(user_id)
      }
    })
  }
  getDocumentTypes() {
    let user_id = this.ssn.getTrans_legal().loginId
    return this.http.get<DocumentTypes[]>(this.docTypesApi, {
      params: {
        user_id: String(user_id)
      }
    })
  }
  addDocumentType(newType) {
    let user_id = this.ssn.getTrans_legal().loginId
    console.log(newType)
    return this.http.post<{ message: string }>(this.docTypesApi, newType, {
      params: {
        user_id: String(user_id)
      }
    })
  }

}
