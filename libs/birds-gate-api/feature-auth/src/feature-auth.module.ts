import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { DataAccessModule } from '@birds-gate/data-access';
import { JwtModule } from '@nestjs/jwt';
import { FeatureUsersModule } from '@birds-gate/feature-users';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import jwtConfig from './configs/jwt.config';
import jwtRefreshConfig from './configs/jwt-refresh.config';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [
    PassportModule,
    DataAccessModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(jwtRefreshConfig),
    FeatureUsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  exports: [],
})
export class FeatureAuthModule {}
