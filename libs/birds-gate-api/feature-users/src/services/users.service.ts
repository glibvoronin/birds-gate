import { Injectable } from '@nestjs/common';
import { User, UsersRepository } from '@birds-gate/data-access';
import {
  CreateUserDto,
  UserResponseDto,
  UserRoleEnum,
} from '@birds-gate/util-interfaces';
import { UserMapper } from '../mappers/user.mapper';

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
}
