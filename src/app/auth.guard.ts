import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _router: Router) { }

  loggedIn() {
    return !!localStorage.getItem('loginToken');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loggedIn()) {
      if (state.url === '/login' || state.url === '/register') {
        this._router.navigate(['/userdashboard']);
        return false;
      } else {
        return true;
      }
    } else {
      if (state.url === '/login' || state.url === '/register') {
        return true;
      } else {
        this._router.navigate(['/login'])
        return false;
      }
    }
  }
}
