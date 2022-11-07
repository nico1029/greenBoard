import { createAction, props } from '@ngrx/store';
import { User } from './../../models/user';

export const login: any = createAction(
  '[Login Page] User Login',
  props<{ user: User }>()
);

export const logout: any = createAction('[Side Menu] Log out');
