import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenHelper } from '@birds-gate/bg-app-util-auth';

export const publicGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isAuthenticated = !!TokenHelper.getAuthToken();

  if (isAuthenticated) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
