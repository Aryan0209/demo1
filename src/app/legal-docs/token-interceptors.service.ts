import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { SessionService } from '../tokens/session.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorsService implements HttpInterceptor {
  constructor(private Ssn: SessionService) {}

  intercept(req, next) {
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.Ssn.getTrans_legal().auth_token,
      },
    });
    return next.handle(tokenizedReq);
  }
}
