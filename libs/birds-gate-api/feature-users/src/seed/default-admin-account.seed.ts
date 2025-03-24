import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';
import { UsersRepository } from '@birds-gate/data-access';
import { UserRoleEnum } from '@birds-gate/util-interfaces';

export async function defaultAdminAccountSeed(
  usersRepo: UsersRepository
): Promise<void> {
  const credentials = {
    username: 'admin',
    password: 'admin',
  };

  const logger = new Logger('defaultAdminAccountSeed');

  const existing = await usersRepo.findOneByUsername(credentials.username);
  if (existing) {
    logger.log('✅ Admin user already exists.');
    return;
  }

  const password = await bcrypt.hash(credentials.password, 10);

  await usersRepo.create({
    username: credentials.username,
    password,
    role: UserRoleEnum.ADMIN,
  });

  logger.log(
    `🚀 Admin user created successfully (username: ${credentials.username}; password: ${credentials.password})`
  );
}
