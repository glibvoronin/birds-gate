import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UsersRepository } from '@birds-gate/data-access';
import { UserRoleEnum } from '@birds-gate/util-interfaces';
import { UserMapper } from '../mappers/user.mapper';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
} from '@birds-gate/util-dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async findOne(username: string): Promise<User | null> {
    const user = await this.userRepository.findOneByUsername(username);
    if (!user) {
      return null;
    }
    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      return null;
    }
    return user;
  }

  async getAllUsers(authRole: UserRoleEnum): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    if (authRole === UserRoleEnum.ADMIN) {
      return UserMapper.toResponseDtoList(users);
    }
    return UserMapper.toShortResponseDtoList(users);
  }

  async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
    const user = await UserMapper.fromCreateDto(dto);
    const createdUser = await this.userRepository.create(user);
    return UserMapper.toResponseDto(createdUser);
  }

  async updateUser(
    id: string,
    dto: Partial<UpdateUserDto>
  ): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    const updated = await UserMapper.applyUpdateDto(user, dto);
    const saved = await this.userRepository.update(updated);

    return UserMapper.toResponseDto(saved);
  }

  async updateRefreshTokenHash(userId: string, refreshTokenHash: string) {
    return await this.userRepository.updateRefreshTokenHash(
      userId,
      refreshTokenHash
    );
  }

  async logout(userId: string) {
    return await this.userRepository.removeRefreshTokenHash(userId);
  }
}
