import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { SkipAuth } from '../decorators/skip-auth.decorator';
import {
  AuthenticatedJwtRequest,
  AuthenticatedRequest,
} from '@birds-gate/feature-users';
import { JwtRefreshAuthGuard } from '../guards/jwt-refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }

  @SkipAuth()
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  async refreshToken(@Req() req: AuthenticatedJwtRequest) {
    return this.authService.refreshToken(req.user.userId);
  }

  @Post('logout')
  async signOut(@Req() req: AuthenticatedJwtRequest) {
    await this.authService.logout(req.user.userId);
    return {};
  }
}
