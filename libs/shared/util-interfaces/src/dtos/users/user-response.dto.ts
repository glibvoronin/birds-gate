import { UserRoleEnum } from '../../enums/roles/user-role.enum';

export class UserResponseDto {
  id: string;
  username: string;
  role: UserRoleEnum;
  createdAt?: Date;
  updatedAt?: Date;
}
