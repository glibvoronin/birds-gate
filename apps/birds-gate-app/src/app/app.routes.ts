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
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@birds-gate/bg-app-feature-layout').then(
        (m) => m.DashboardLayoutComponent
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users',
      },
      {
        path: 'users',
        loadComponent: () =>
          import('@birds-gate/bg-app-feature-users-dashboard').then(
            (m) => m.BgAppFeatureUsersDashboardComponent
          ),
      },
    ],
  },
  // TODO: Some nice "Not Found" page for catchAll route
  {
    path: '**',
    redirectTo: '/',
  },
];
