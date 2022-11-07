import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { selectIsLoggedIn } from '../store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly store: Store) {
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
    return this.store.select(selectIsLoggedIn).pipe(
      tap((loggedIn: boolean) => {
        if (!loggedIn) {
          this.router.navigate(['']);
        }
      })
    );
  }
}
