import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import {
  AuthenticatedJwtRequest,
  UserRoleEnum,
} from '@birds-gate/util-interfaces';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '@birds-gate/util-interfaces';
import { AuthRoles } from '@birds-gate/util-roles';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @AuthRoles(UserRoleEnum.USER, UserRoleEnum.ADMIN)
  @Get('')
  getUsers(@Req() req: AuthenticatedJwtRequest) {
    return this.usersService.getAllUsers(req.user.role);
  }

  @Post('')
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }
}
