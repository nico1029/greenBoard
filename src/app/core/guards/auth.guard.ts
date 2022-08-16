import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    // TODO
  }
  public canActivate(
    route: ActivatedRouteSnapshot, // eslint-disable-line
    state: RouterStateSnapshot // eslint-disable-line
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthenticated: boolean = this.authService.isLoggedIn;
    if (!isAuthenticated) {
      this.router.navigate(['sign-in']);
    }
    return isAuthenticated;
  }
}
