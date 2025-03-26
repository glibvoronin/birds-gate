import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

import Aura from '@primeng/themes/aura';
import { provideStore } from '@ngrx/store';
import { authFeature, authEffects } from '@birds-gate/data-access-fe-auth';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authInterceptor } from '@birds-gate/feature-fe-auth';
import { unauthorizedInterceptor } from '@birds-gate/feature-fe-auth';
import { DialogService } from 'primeng/dynamicdialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([authInterceptor, unauthorizedInterceptor])
    ),
    DialogService,
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: 'none',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),
    provideStore({
      [authFeature.name]: authFeature.reducer,
    }),
    provideEffects(authEffects.AuthEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
