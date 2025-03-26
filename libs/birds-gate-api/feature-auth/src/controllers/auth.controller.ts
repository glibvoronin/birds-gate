import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { SkipAuth } from '../decorators/skip-auth.decorator';
import {
  AuthenticatedJwtRequest,
  AuthenticatedRequest,
} from '@birds-gate/feature-users';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Req() req: AuthenticatedJwtRequest) {
    return req.user;
  }
}
