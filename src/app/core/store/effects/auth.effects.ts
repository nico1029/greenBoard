import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Actions,
  createEffect,
  CreateEffectMetadata,
  ofType,
} from '@ngrx/effects';
import { tap } from 'rxjs';
import { AuthActions } from '../action-types';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly router: Router
  ) {
    // TODO
  }

  public logIn$: CreateEffectMetadata = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.login),
        tap((action: any) => {
          localStorage.setItem('user', JSON.stringify(action.user));
          this.router.navigate(['dashboard']);
        })
      );
    },
    { dispatch: false }
  );

  public logOut$: CreateEffectMetadata = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('user');
          this.router.navigateByUrl('');
        })
      );
    },
    { dispatch: false }
  );
}
