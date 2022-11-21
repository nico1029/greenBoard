import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Actions,
  createEffect,
  CreateEffectMetadata,
  ofType,
} from '@ngrx/effects';
import { tap } from 'rxjs';
import { UserService } from 'src/app/modules/user/services/user.service';
import { AuthService } from '../../services/auth.service';
import { AuthActions } from '../action-types';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {
    // TODO
  }

  public logIn$: CreateEffectMetadata = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.login),
        tap((action: any) => {
          const currentDate: string = new Date().toJSON();
          this.userService.usersCollection
            .doc(action.user.uid)
            .update({ lastLogin: currentDate });
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
          this.authService.signOut();
          localStorage.removeItem('user');
          this.router.navigateByUrl('');
        })
      );
    },
    { dispatch: false }
  );
}
