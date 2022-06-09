import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { USER_LOGIN } from '../../util/config';

@Injectable({ providedIn: 'root' })
export class isLoginGuard implements CanActivate {
  constructor(private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem(USER_LOGIN)) {
      return true;
    }

    this.route.navigate(['/user/login']);
    return false;
  }
}
