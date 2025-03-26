import { UserRoleEnum } from '@birds-gate/util-interfaces';

export interface AuthenticatedJwtRequest extends Request {
  user: {
    userId: string;
    username: string;
    role: UserRoleEnum;
  };
}
