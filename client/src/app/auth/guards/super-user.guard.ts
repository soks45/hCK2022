import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { instanceOfEmployee } from '../../models/employee';

@Injectable({
  providedIn: 'root'
})
export class SuperUserGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user$.pipe(
      map((userOrOrg) => userOrOrg !== null && instanceOfEmployee(userOrOrg) && userOrOrg.is_admin)
    );
  }

}
