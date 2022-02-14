import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SessionService } from './session.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class HttpinterceptorService {
  public flag: boolean = false;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    public Session: SessionService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if  (this.Session.get().login)
    if (this.Session.getTrans_legal().success) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.Session.getTrans_legal().auth_token
          // Authorization: this.Session.get().tokens.api_token
        }
      });
    }
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let status = 0;
          if (error.error instanceof ErrorEvent) {
          }
          else {
            status = error.status;
          }
          if (status === 401 && !this.flag) {
            this.flag = true;
            this.Session.destroy();
            this.router.navigate(['/legal-docs/email-validate']);
            this.toastr.error('Not Authorized!', 'Something wrong');
          }
          return throwError(error);
        })
      );
  }
}
