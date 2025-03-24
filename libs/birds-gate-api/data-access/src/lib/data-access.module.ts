import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from '../repositories/users.repository';
import { User } from '../entities/user.entity';

@Module({
  controllers: [],
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow('DB_HOST'),
        port: parseInt(config.getOrThrow('DB_PORT') ?? '5432'),
        username: config.getOrThrow('DB_USERNAME'),
        password: config.getOrThrow('DB_PASSWORD'),
        database: config.getOrThrow('DB_NAME'),
        entities: [User],
        synchronize: config.getOrThrow('DB_SYNCHRONIZE') ?? false,
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UsersRepository],
  exports: [UsersRepository, TypeOrmModule],
})
export class DataAccessModule {}
