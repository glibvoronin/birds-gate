import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  FeatureAuthModule,
  JwtConfig,
  JwtRefreshConfig,
} from '@birds-gate/feature-auth';
import { DataAccessModule } from '@birds-gate/data-access';
import { FeatureUsersModule } from '@birds-gate/feature-users';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@birds-gate/feature-auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [JwtConfig.default, JwtRefreshConfig.default],
    }),
    DataAccessModule,
    FeatureAuthModule,
    FeatureUsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
