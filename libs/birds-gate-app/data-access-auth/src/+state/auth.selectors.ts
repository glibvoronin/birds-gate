import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

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

export const selectAccessToken = createSelector(
  selectAuthState,
  (state) => state.accessToken
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => !!state.accessToken
);
