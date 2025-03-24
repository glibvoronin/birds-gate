import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { DataAccessModule } from '@birds-gate/data-access';

@Module({
  controllers: [],
  imports: [DataAccessModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class FeatureUsersModule {}
