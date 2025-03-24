import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { DataAccessModule, User } from '@birds-gate/data-access';
import { JwtModule } from '@nestjs/jwt';
import { FeatureUsersModule } from '@birds-gate/feature-users';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    DataAccessModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: config.getOrThrow('JWT_TOKEN_EXPIRES_IN') },
      }),
    }),
    FeatureUsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [],
})
export class FeatureAuthModule {}
