import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles.guard';
import { ROLES_META_KEY } from './roles.decorator';

export const AuthRoles = (...roles: string[]) => {
  return applyDecorators(
    SetMetadata(ROLES_META_KEY, roles),
    UseGuards(RolesGuard)
  );
};
