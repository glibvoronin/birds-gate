import { createFeature, createReducer, on } from '@ngrx/store';
import { login, loginError, loginSuccess, logout } from './auth.actions';
import { AuthenticatedUser, TokenHelper } from '@birds-gate/bg-app-util-auth';

export const authFeatureKey = 'auth';

export interface State {
  fetchingLogin: boolean;
  accessToken: string | null;
  loginErrorMessage: string | null;
  user: AuthenticatedUser | null;
}

export const initialState: State = {
  fetchingLogin: false,
  accessToken: TokenHelper.getAuthToken(),
  loginErrorMessage: null,
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    fetchingLogin: true,
    loginErrorMessage: null,
  })),
  on(loginSuccess, (state, { accessToken }) => ({
    ...state,
    fetchingLogin: false,
    accessToken,
  })),
  on(loginError, (state, { error }) => ({
    ...state,
    loginErrorMessage: error,
    fetchingLogin: false,
  })),
  on(logout, (state) => ({
    ...state,
    user: null,
    accessToken: null,
  }))
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer,
});
