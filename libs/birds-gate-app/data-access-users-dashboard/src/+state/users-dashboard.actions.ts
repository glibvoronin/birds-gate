import { createAction, props } from '@ngrx/store';
import { CreateUserDto, UserResponseDto } from '@birds-gate/util-dto';

export const loadUsers = createAction('[Users dashboard] Load users');
export const loadUsersSuccess = createAction(
  '[Users dashboard] Load users success',
  props<{ users: UserResponseDto[] }>()
);
export const loadUsersError = createAction(
  '[Users dashboard] Load users error',
  props<{ error?: string }>()
);

export const editUser = createAction(
  '[Users dashboard] edit user',
  props<{ user: UserResponseDto; closeDialogCb: () => void }>()
);
export const editUserSuccess = createAction(
  '[Users dashboard] edit user success',
  props<{ user: UserResponseDto }>()
);
export const editUserError = createAction(
  '[Users dashboard] edit user error',
  props<{ error?: string }>()
);

export const createUser = createAction(
  '[Users dashboard] create user',
  props<{ user: CreateUserDto; closeDialogCb: () => void }>()
);
export const createUserSuccess = createAction(
  '[Users dashboard] create user success',
  props<{ user: UserResponseDto }>()
);
export const createUserError = createAction(
  '[Users dashboard] create user error',
  props<{ error?: string }>()
);
