import { User } from '@birds-gate/data-access';
import * as bcrypt from 'bcrypt';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
} from '@birds-gate/util-dto';
import { UserRoleEnum } from '@birds-gate/util-interfaces';

export class UserMapper {
  static toResponseDto(user: User): UserResponseDto {
    const { password, refreshTokenHash, ...safeUser } = user;
    return {
      ...safeUser,
    };
  }

  static toShortResponseDto(user: User): UserResponseDto {
    const { password, refreshTokenHash, createdAt, updatedAt, ...safeUser } =
      user;
    return {
      ...safeUser,
    };
  }

  static toResponseDtoList(users: User[]): UserResponseDto[] {
    return users.map(UserMapper.toResponseDto);
  }

  static toShortResponseDtoList(users: User[]): UserResponseDto[] {
    return users.map(UserMapper.toShortResponseDto);
  }

  static async fromCreateDto(dto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return new User({
      ...dto,
      role: dto.role as UserRoleEnum,
      password: hashedPassword,
    });
  }

  static async applyUpdateDto(
    user: User,
    dto: Partial<UpdateUserDto>
  ): Promise<User> {
    if (dto.role) {
      user.role = dto.role as UserRoleEnum;
    }
    if (dto.password) {
      user.password = await bcrypt.hash(dto.password, 10);
    }
    return user;
  }
}
