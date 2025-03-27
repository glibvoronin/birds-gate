import { createFeature, createReducer, on } from '@ngrx/store';
import { login, loginError, loginSuccess, logout } from './auth.actions';
import { AuthenticatedUser, TokenHelper } from '@birds-gate/bg-app-util-auth';
import { JwtDecoderMapper } from '../../../util-auth/src/mappers/jwt-decoder.mapper';

export const authFeatureKey = 'auth';

export interface State {
  fetchingLogin: boolean;
  loginErrorMessage: string | null;
  user: AuthenticatedUser | null;
}

export const initialState: State = {
  fetchingLogin: false,
  loginErrorMessage: null,
  user: JwtDecoderMapper.authUserFromJwtToken(TokenHelper.getAuthToken() || ''),
};

export const reducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    fetchingLogin: true,
    loginErrorMessage: null,
  })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    fetchingLogin: false,
    user,
  })),
  on(loginError, (state, { error }) => ({
    ...state,
    loginErrorMessage: error,
    fetchingLogin: false,
  })),
  on(logout, (state) => ({
    ...state,
    user: null,
  }))
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer,
});
