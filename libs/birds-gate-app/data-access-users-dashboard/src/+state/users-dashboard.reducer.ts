import { createFeature, createReducer, on } from '@ngrx/store';
import {
  editUser,
  editUserError,
  editUserSuccess,
  loadUsers,
  loadUsersError,
  loadUsersSuccess,
} from './users-dashboard.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { UserResponseDto } from '@birds-gate/util-dto';

export const usersDashboardFeatureKey = 'usersDashboard';

export interface State extends EntityState<UserResponseDto> {
  fetchingUsers: boolean;
  fetchingEditUser: boolean;
}

export const adapter: EntityAdapter<UserResponseDto> =
  createEntityAdapter<UserResponseDto>();

export const initialState: State = adapter.getInitialState({
  fetchingUsers: false,
  fetchingEditUser: false,
});

export const reducer = createReducer(
  initialState,
  on(loadUsers, (state) => ({ ...state, fetchingUsers: true })),
  on(loadUsersSuccess, (state, { users }) =>
    adapter.setAll(users, { ...state, fetchingUsers: false })
  ),
  on(loadUsersError, (state) => ({ ...state, fetchingUsers: false })),
  on(editUser, (state) => ({ ...state, fetchingEditUser: false })),
  on(editUserSuccess, (state, { user }) => {
    const { id, ...changes } = user;
    return adapter.updateOne({ id, changes }, { ...state });
  }),
  on(editUserError, (state) => ({ ...state, fetchingEditUser: false }))
);

export const usersDashboardFeature = createFeature({
  name: usersDashboardFeatureKey,
  reducer,
});
