import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { SessionService } from 'src/app/tokens/session.service';

@Injectable({
  providedIn: 'root'
})
export class LegalAuthGuard implements CanActivate {

  constructor(private ssn: SessionService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return false;
    if (this.ssn.getTrans_legal().loginId) return true
    else {
      this.router.navigate(['/legal-docs/auth/email-validate']);
      return false;
    }
  }

}
