import { createAction, props } from '@ngrx/store';
import { UserAuth } from '../../models/user.interface';

export const login: any = createAction(
  '[Login Page] User Login',
  props<{ user: UserAuth }>()
);

export const logout: any = createAction('[Side Menu] Log out');
