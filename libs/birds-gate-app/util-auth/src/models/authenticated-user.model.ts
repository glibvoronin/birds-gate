import { UserRoleEnum } from '@birds-gate/util-interfaces';

export interface AuthenticatedUser {
  id: string;
  username: string;
  role: UserRoleEnum;
}
