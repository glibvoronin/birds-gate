import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthenticatedRequest } from '@birds-gate/util-interfaces';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { SkipAuth } from '../decorators/skip-auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }
}
