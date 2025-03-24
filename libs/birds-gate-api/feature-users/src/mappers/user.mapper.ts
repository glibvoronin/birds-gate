import { User } from '@birds-gate/data-access';
import { CreateUserDto, UserResponseDto } from '@birds-gate/util-interfaces';
import * as bcrypt from 'bcrypt';

export class UserMapper {
  static toResponseDto(user: User): UserResponseDto {
    const { password, ...safeUser } = user;
    return {
      ...safeUser,
    };
  }

  static toShortResponseDto(user: User): UserResponseDto {
    const { password, createdAt, updatedAt, ...safeUser } = user;
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
      password: hashedPassword,
    });
  }
}
