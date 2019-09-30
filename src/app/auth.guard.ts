import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {
  AuthService
} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authservice: AuthService,
    private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(state);
    if (this._authservice.loggedIn()) {
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
