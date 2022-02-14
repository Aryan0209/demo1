import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})

export class LogoutGuard implements CanActivate {
  constructor(
    private session: SessionService, 
    private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.session.getTrans().success){
        return true;
      }else{
        this.router.navigate(['/dashboard','overview', new Date().getTime()]);
        return false;
      }
  }
}
