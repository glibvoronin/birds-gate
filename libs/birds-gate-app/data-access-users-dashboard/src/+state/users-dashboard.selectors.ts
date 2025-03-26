import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsersDashboard from './users-dashboard.reducer';

export const selectUsersDashboardState = createFeatureSelector<fromUsersDashboard.State>(
  fromUsersDashboard.usersDashboardFeatureKey
);
