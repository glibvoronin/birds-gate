import { UserRoleDto } from './user-role.dto';

export interface UserResponseDto {
  id: string;
  username: string;
  role: UserRoleDto;
  createdAt?: Date;
  updatedAt?: Date;
}
