import { ActionReducer, createReducer, on } from '@ngrx/store';
import { UserAuth } from '../../models/user.interface';
import { AuthActions } from '../action-types';

export const FeatureKey: string = 'auth'; // eslint-disable-line

export interface AuthState {
  user: UserAuth;
}

export const initialAuthState: AuthState = {
  user: {} as UserAuth,
};

export const authReducer: ActionReducer<AuthState> = createReducer(
  initialAuthState,
  on(AuthActions.login, (state: AuthState, action: any): AuthState => {
    return {
      user: action.user,
    };
  }),

  on(AuthActions.logout, (): AuthState => {
    return {
      user: {} as UserAuth, // eslint-disable-line
    };
  })
);
