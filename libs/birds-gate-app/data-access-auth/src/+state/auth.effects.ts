import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { login, loginError, loginSuccess } from './auth.actions';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticatedUser, TokenHelper } from '@birds-gate/bg-app-util-auth';
import { JwtDecoderMapper } from '../../../util-auth/src/mappers/jwt-decoder.mapper';

@Injectable()
export class AuthEffects {
  auth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      concatMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map(({ access_token }) => {
            TokenHelper.setAuthToken(access_token);
            this.router.navigate(['/']);
            return loginSuccess({
              accessToken: access_token,
              user: JwtDecoderMapper.authUserFromJwtToken(
                access_token
              ) as AuthenticatedUser,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            const error =
              err.status === 401
                ? 'Wrong username or password'
                : 'There was a problem during authentication';
            return of(loginError({ error }));
          })
        )
      )
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
}
