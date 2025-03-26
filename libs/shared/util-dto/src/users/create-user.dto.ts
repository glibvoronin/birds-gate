import { UserRoleDto } from './user-role.dto';

export class CreateUserDto {
  username!: string;
  password!: string;
  role!: UserRoleDto;
}
