import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducers';

export const selectAuthState: MemoizedSelector<any, any> =
  createFeatureSelector<AuthState>('auth');

export const selectUser: MemoizedSelector<any, any> = createSelector(
  selectAuthState,
  (auth: AuthState) => auth.user
);
export const selectIsLoggedIn: MemoizedSelector<any, any> = createSelector(
  selectAuthState,
  (auth: AuthState) => Object.keys(auth.user).length !== 0
);

export const selectIsLoggedOut: MemoizedSelector<any, any> = createSelector(
  selectIsLoggedIn,
  (loggedIn: MemoizedSelector<any, any>) => !loggedIn
);
