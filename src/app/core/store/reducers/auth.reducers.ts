import { ActionReducer, createReducer, on } from '@ngrx/store';
import { User } from '../../models/user';
import { AuthActions } from '../action-types';

export const FeatureKey: string = 'auth'; // eslint-disable-line

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: {} as User,
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
      user: {} as User, // eslint-disable-line
    };
  })
);
