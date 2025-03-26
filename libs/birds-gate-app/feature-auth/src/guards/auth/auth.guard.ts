import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '@birds-gate/data-access-fe-auth';
import { LOGIN_PATH } from '@birds-gate/util-constants';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  const isAuthenticated = store.selectSignal(selectIsAuthenticated)();

  if (!isAuthenticated) {
    router.navigate(['/', LOGIN_PATH]);
    return false;
  }

  return true;
};
