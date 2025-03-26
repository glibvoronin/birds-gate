import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import {
  createUser,
  createUserError,
  createUserSuccess,
  editUser,
  editUserSuccess,
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
            return of(loadUsersError({}));
          })
        )
      )
    );
  });

  editUserEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editUser),
      switchMap(({ user, closeDialogCb }) =>
        this.usersDashboardService.editUser(user).pipe(
          map((userResponse) => {
            closeDialogCb();
            return editUserSuccess({
              user: userResponse,
            });
          }),
          catchError(() => {
            return of(loadUsersError({}));
          })
        )
      )
    );
  });

  createUserEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createUser),
      switchMap(({ user, closeDialogCb }) =>
        this.usersDashboardService.createUser(user).pipe(
          map((userResponse) => {
            closeDialogCb();
            return createUserSuccess({
              user: userResponse,
            });
          }),
          catchError(() => {
            return of(createUserError({}));
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
