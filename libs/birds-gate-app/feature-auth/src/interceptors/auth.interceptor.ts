import { HttpInterceptorFn } from '@angular/common/http';
import { BE_URL } from '@birds-gate/util-constants';
import { TokenHelper } from '@birds-gate/bg-app-util-auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = TokenHelper.getAuthToken();

  if (
    !token ||
    !req.url.startsWith(BE_URL) ||
    req.url.includes('/api/auth/refresh')
  ) {
    return next(req);
  }
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};
