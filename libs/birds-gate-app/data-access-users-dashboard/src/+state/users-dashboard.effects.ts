import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import {
  loadUsers,
  loadUsersError,
  loadUsersSuccess,
} from './users-dashboard.actions';
import { UsersDashboardService } from '../services/users-dashboard.service';

@Injectable()
export class UsersDashboardEffects {
  loadUsersDashboard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.usersDashboardService.fetchUsers().pipe(
          map((users) => {
            return loadUsersSuccess({ users });
          }),
          catchError(() => {
            return of(loadUsersError);
          })
        )
      )
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly usersDashboardService: UsersDashboardService
  ) {}
}
