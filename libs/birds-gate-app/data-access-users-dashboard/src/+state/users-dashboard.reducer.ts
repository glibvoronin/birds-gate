import { createFeature, createReducer, on } from '@ngrx/store';
import {
  loadUsers,
  loadUsersError,
  loadUsersSuccess,
} from './users-dashboard.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { UserResponseDto } from '@birds-gate/util-dto';

export const usersDashboardFeatureKey = 'usersDashboard';

export interface State extends EntityState<UserResponseDto> {
  fetchingUsers: boolean;
}

export const adapter: EntityAdapter<UserResponseDto> =
  createEntityAdapter<UserResponseDto>();

export const initialState: State = adapter.getInitialState({
  fetchingUsers: false,
});

export const reducer = createReducer(
  initialState,
  on(loadUsers, (state) => ({ ...state, fetchingUsers: true })),
  on(loadUsersSuccess, (state) => ({ ...state, fetchingUsers: true })),
  on(loadUsersError, (state) => ({ ...state, fetchingUsers: true }))
);

export const usersDashboardFeature = createFeature({
  name: usersDashboardFeatureKey,
  reducer,
});
