import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsersDashboard from './users-dashboard.reducer';

export const selectUsersDashboardState =
  createFeatureSelector<fromUsersDashboard.State>(
    fromUsersDashboard.usersDashboardFeatureKey
  );

const { selectAll, selectEntities, selectIds, selectTotal } =
  fromUsersDashboard.adapter.getSelectors(selectUsersDashboardState);

export const selectAllUsers = selectAll;

export const selectUserEntities = selectEntities;

export const selectUserById = (id: string) =>
  createSelector(selectUserEntities, (entities) => entities[id]);
