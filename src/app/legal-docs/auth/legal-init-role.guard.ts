import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/tokens/session.service';

@Injectable({
  providedIn: 'root'
})
export class LegalInitRoleGuard implements CanActivate {
  constructor(private ssn: SessionService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return false;
    console.log("Im here", this.ssn.getTrans_legal())
    if (this.ssn.getTrans_legal().role === 'initiator') return true
    else {
      this.router.navigate(['/history']);
      return false;
    }
  }

}