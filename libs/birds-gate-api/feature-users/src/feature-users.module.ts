import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { DataAccessModule } from '@birds-gate/data-access';
import { UsersController } from './controllers/users.controller';

@Module({
  controllers: [UsersController],
  imports: [DataAccessModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class FeatureUsersModule {}
