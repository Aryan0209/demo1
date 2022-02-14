import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/tokens/session.service';
import { environment } from 'src/environments/environment';
import { OKLogin } from '../models/OkLogin';
import HistoryResponse from "./HistoryResponse.model"


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const url = environment.legal_api + '/tododoc/'
const renewUrl = environment.legal_api + '/renewform/'

@Injectable({
  providedIn: 'root'
})

export class LegalHistoryService {
  requesterDetails: OKLogin
  constructor(private http: HttpClient, private ssn: SessionService) {
    // this.requesterDetails = this.ssn.getTrans_legal()
  }

  getHistory(status: Number, state: Number): Observable<HistoryResponse[]> {
    let requesterDetails = this.ssn.getTrans_legal()
    let req_params = {
      requester_role: requesterDetails.role,
      requester_id: String(requesterDetails.loginId),
      state: String(state),
      requester_department: requesterDetails.department,
    }
    if (requesterDetails.role === "hod2") delete req_params.requester_department

    return this.http.get<HistoryResponse[]>(url + status + '/', {
      params: req_params
    });
  }

  loadHistoryFor(mode: string) {
    const { role: requester_role, loginId: requester_id, department: requester_department } = this.ssn.getTrans_legal()
    return this.http.get<any>(url, {
      params: {
        requester_role,
        requester_id: String(requester_id),
        query_for: mode,
        requester_department,
      }
    })
  }

  giveFilterStatuses(tabname) {
    [
      { label: 'Initiated', value: 1 },
      { label: 'Deptt HOD Approved', value: '2' },
      { label: 'Deptt HOD Reconsider', value: '4' },
      { label: 'Rejected', value: '5' },
      { label: 'CS HOD Approved', value: '3' },
      { label: 'CS HOD Reconsider', value: '6' },
      { label: 'Closure Attached', value: '14' },
      { label: 'Initiator Reconsidered', value: '22' },
      { label: 'CS HOD Reconsidered Draft', value: '23' },
      { label: 'Draft Submit', value: '11' },
      { label: 'Initiator Approved Draft', value: '12' },
      { label: 'CS HOD Approved Draft', value: '13' },
    ]
  }
}


