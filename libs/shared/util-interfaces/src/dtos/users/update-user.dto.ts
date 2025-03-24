import { UserRoleEnum } from '../../enums/roles/user-role.enum';

export class UpdateUserDto {
  password: string;
  role: UserRoleEnum;
}
