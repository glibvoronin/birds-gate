import { UserRoleEnum } from '@birds-gate/util-interfaces';

export interface AuthenticatedUser {
  username: string;
  role: UserRoleEnum;
}
