import { UserRoleEnum } from '../../enums/roles/user-role.enum';

export interface AuthenticatedJwtRequest extends Request {
  user: {
    userId: string;
    username: string;
    role: UserRoleEnum;
  };
}
