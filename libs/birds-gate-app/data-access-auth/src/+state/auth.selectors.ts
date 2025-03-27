import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import { UserRoleEnum } from '@birds-gate/util-interfaces';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectLoginFetching = createSelector(
  selectAuthState,
  (state) => state?.fetchingLogin
);

export const selectLoginErrorMessage = createSelector(
  selectAuthState,
  (state) => state?.loginErrorMessage
);

export const selectIsAdmin = createSelector(
  selectAuthState,
  (state) => state.user?.role === UserRoleEnum.ADMIN
);

export const selectUserId = createSelector(
  selectAuthState,
  (state) => state.user?.id ?? null
);

export const selectUserName = createSelector(
  selectAuthState,
  (state) => state.user?.username
);
