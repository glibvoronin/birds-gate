import { Injectable } from '@nestjs/common';
import { User, UsersRepository } from '@birds-gate/data-access';
import { UserResponseDto } from '@birds-gate/util-interfaces';
import { UserMapper } from '../mappers/user.mapper';

import { CreateUserDto } from '@birds-gate/util-interfaces';

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

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return UserMapper.toResponseDtoList(users);
  }

  async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
    const user = await UserMapper.fromCreateDto(dto);
    const createdUser = await this.userRepository.create(user);
    return UserMapper.toResponseDto(createdUser);
  }
}
