import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LOGIN_PATH } from '@birds-gate/util-constants';
import { TokenHelper } from '@birds-gate/bg-app-util-auth';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isAuthenticated = !!TokenHelper.getAuthToken();

  if (!isAuthenticated) {
    router.navigate(['/', LOGIN_PATH]);
    return false;
  }

  return true;
};
