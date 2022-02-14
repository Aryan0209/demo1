import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from '../tokens/session.service';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  private apiServer = environment.apiurl;
  constructor(
    private httpClient: HttpClient,
    private Session: SessionService) { }

  getInitiator(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + 'plants/' + this.Session.get().myrole.plants_id + '/initiators/' + this.Session.get().id + '/summary')
  }
  getDgms(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + 'plants/' + this.Session.get().myrole.plants_id + '/dgms/' + this.Session.get().id + '/summary')
  }
  getAssistantmanagers(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + 'plants/' + this.Session.get().myrole.plants_id + '/assistantmanagers/' + this.Session.get().id + '/summary')
  }
  getSeniormanagers(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + 'plants/' + this.Session.get().myrole.plants_id + '/seniormanagers/' + this.Session.get().id + '/summary')
  }
  getGroupcontrollers(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + 'plants/' + this.Session.get().myrole.plants_id + '/groupcontrollers/' + this.Session.get().id + '/summary')
  }
  getDirector(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + 'plants/' + this.Session.get().myrole.plants_id + '/directors/' + this.Session.get().id + '/summary')
  }
  getAuditor(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + 'plants/' + this.Session.get().myrole.plants_id + '/auditors/' + this.Session.get().id + '/summary')
  }
}