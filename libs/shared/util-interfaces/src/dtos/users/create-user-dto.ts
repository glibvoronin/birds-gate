import { UserRoleEnum } from '../../enums/roles/user-role.enum';

export class CreateUserDto {
  username: string;
  password: string;
  role: UserRoleEnum;
}
