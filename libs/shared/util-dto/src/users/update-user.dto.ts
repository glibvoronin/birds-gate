import { UserRoleDto } from './user-role.dto';

export class UpdateUserDto {
  password!: string;
  role!: UserRoleDto;
}
