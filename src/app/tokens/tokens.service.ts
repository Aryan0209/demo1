import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SessionService } from './session.service';
import { HttpHeaders } from '@angular/common/http';
import { UsersTrans, Users } from 'src/app/users/users';

@Injectable({
  providedIn: 'root',
})
export class TokensService {
  private apiServer = environment.legal_api;
  private legal_logout = environment.legal_api + '/logout/';
  constructor(
    private httpClient: HttpClient,
    private Session: SessionService
  ) {}

  create(obj: Users): Observable<Users> {
    const header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post<any>(this.apiServer, obj, { headers: header });
  }
  createTrans(obj: UsersTrans): Observable<UsersTrans> {
    const header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post<any>(this.apiServer, obj, { headers: header });
  }
  newpass(post): Observable<any> {
    return this.httpClient.put<any>(
      this.apiServer + 'authorization/' + this.Session.getTrans().loginId,
      post
    );
  }
  deleteToken(): Observable<any> {
    return this.httpClient.delete<any>(
      this.legal_logout + this.Session.getTrans_legal().loginId + '/'
    );
  }
}
