import { jwtDecode } from 'jwt-decode';
import { JwtPayloadDto } from '@birds-gate/util-dto';
import { AuthenticatedUser } from '@birds-gate/bg-app-util-auth';
import { UserRoleEnum } from '@birds-gate/util-interfaces';

export class JwtDecoderMapper {
  static authUserFromJwtToken(token: string): AuthenticatedUser | null {
    try {
      const decoded = jwtDecode<JwtPayloadDto>(token);
      return {
        role: decoded.role as UserRoleEnum,
        username: decoded.username,
      };
    } catch {
      //Todo: Logging to happen here. E.g. sentry / newrellic
      return null;
    }
  }
}
