import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '@birds-gate/data-access-fe-auth';
import { TokenHelper } from '@birds-gate/bg-app-util-auth';
import { LOGIN_PATH } from '@birds-gate/util-constants';
import { Router } from '@angular/router';

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401 || req.url.includes('/api/auth/refresh')) {
        return throwError(() => error);
      }

      const refreshToken = TokenHelper.getRefreshToken();

      if (!refreshToken) {
        return throwError(() => error);
      }

      return authService.refreshToken(refreshToken).pipe(
        switchMap(({ access_token }) => {
          const retriedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${access_token}`,
            },
          });

          return next(retriedReq);
        }),
        catchError((refreshError) => {
          TokenHelper.removeRefreshToken();
          TokenHelper.removeAuthToken();
          router.navigate(['/', LOGIN_PATH]);
          return throwError(() => refreshError);
        })
      );
    })
  );
};
