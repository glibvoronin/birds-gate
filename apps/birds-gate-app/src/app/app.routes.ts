import { Route } from '@angular/router';
import { authGuard, publicGuard } from '@birds-gate/feature-fe-auth';
import { LOGIN_PATH } from '@birds-gate/util-constants';

export const appRoutes: Route[] = [
  {
    path: LOGIN_PATH,
    canActivate: [publicGuard],
    loadComponent: () =>
      import('@birds-gate/feature-fe-auth').then((m) => m.LoginPageComponent),
  },
  {
    path: 'users',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@birds-gate/bg-app-feature-users-dashboard').then(
        (m) => m.BgAppFeatureUsersDashboardComponent
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users',
  },
  // TODO: Some nice "Not Found" page for catchAll route
  {
    path: '**',
    redirectTo: '/',
  },
];
