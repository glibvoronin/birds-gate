import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { logout } from '@birds-gate/data-access-fe-auth';
import { LOGIN_PATH } from '@birds-gate/util-constants';
import { TokenHelper } from '@birds-gate/bg-app-util-auth';

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        TokenHelper.removeAuthToken();
        store.dispatch(logout());
        router.navigate(['/', LOGIN_PATH]);
      }

      return throwError(() => error);
    })
  );
};
