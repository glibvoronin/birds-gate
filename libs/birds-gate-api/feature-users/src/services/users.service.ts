import { Injectable } from '@nestjs/common';
import { User, UsersRepository } from '@birds-gate/data-access';

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
}
