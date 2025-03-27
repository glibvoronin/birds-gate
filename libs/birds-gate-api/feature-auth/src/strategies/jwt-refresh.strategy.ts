import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import jwtRefreshConfig from '../configs/jwt-refresh.config';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(
    @Inject(jwtRefreshConfig.KEY)
    private readonly refreshConfigService: ConfigType<typeof jwtRefreshConfig>,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: refreshConfigService.secret!,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const authHeader = req.get('authorization');
    const refreshToken = authHeader?.split(' ')[1];
    const isValid = await this.authService.validateRefreshToken(
      payload.sub,
      refreshToken as string
    );
    if (!isValid) {
      throw new UnauthorizedException('Invalid token');
    }
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
      token: refreshToken,
    };
  }
}
