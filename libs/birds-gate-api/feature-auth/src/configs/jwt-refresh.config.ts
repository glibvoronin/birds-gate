import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';
import * as process from 'node:process';

export default registerAs(
  'jwt-refresh',
  (): JwtSignOptions => ({
    secret: process.env['JWT_REFRESH_SECRET'],
    expiresIn: process.env['JWT_REFRESH_TOKEN_EXPIRES_IN'],
  })
);
