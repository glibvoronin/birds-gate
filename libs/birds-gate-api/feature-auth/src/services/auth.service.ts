import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@birds-gate/data-access';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as argon2 from 'argon2';
import { UsersService } from '@birds-gate/feature-users';
import jwtRefreshConfig from '../configs/jwt-refresh.config';
import { ConfigType } from '@nestjs/config';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    @Inject(jwtRefreshConfig.KEY)
    private readonly refreshTokenConf: ConfigType<typeof jwtRefreshConfig>
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...safeUser } = user;
      return safeUser;
    }
    return null;
  }

  async login(user: Omit<User, 'password'>) {
    return this.issueAndStoreTokens(user);
  }

  async refreshToken(userId: string) {
    const user = await this.usersService.findUserById(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.issueAndStoreTokens(user);
  }

  async validateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.usersService.findUserById(userId);
    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const tokenMatches = await argon2.verify(
      user.refreshTokenHash,
      refreshToken
    );
    if (!tokenMatches) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return tokenMatches;
  }

  async logout(userId: string) {
    return this.usersService.logout(userId);
  }

  private async issueAndStoreTokens(user: Omit<User, 'password'>) {
    const { accessToken, refreshToken } = await this.generateTokens(user);
    const refreshTokenHash = await argon2.hash(refreshToken);
    await this.usersService.updateRefreshTokenHash(user.id, refreshTokenHash);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private async generateTokens(user: Omit<User, 'password'>) {
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({ ...payload, jti: randomUUID() }),
      this.jwtService.signAsync(
        { ...payload, jti: randomUUID() },
        this.refreshTokenConf
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
