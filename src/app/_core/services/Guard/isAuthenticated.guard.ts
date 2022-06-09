import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { User } from '../../models/user';
import { USER_LOGIN } from '../../util/config';

@Injectable({ providedIn: 'root' })
export class isAuthenticatedGuard implements CanActivate {
  constructor(private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let userLogin: User = JSON.parse(localStorage.getItem(USER_LOGIN));

    if (userLogin.type === 'ADMIN') {
      return true;
    }

    this.route.navigate(['/home']);
    return false;
  }
}
