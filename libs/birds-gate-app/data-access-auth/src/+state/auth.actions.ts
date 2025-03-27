import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { AuthenticatedUser } from '@birds-gate/bg-app-util-auth';

export const login = createAction(
  '[Login Page] Login',
  props<{ username: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Login Page] Login success',
  props<{
    user: AuthenticatedUser;
  }>()
);
export const loginError = createAction(
  '[Login Page] Login error',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout success');
export const logoutError = createAction('[Auth] Logout error');
