import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import {
  AuthenticatedJwtRequest,
  UpdateUserDto,
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

  @AuthRoles(UserRoleEnum.ADMIN)
  @Patch(':id')
  editUser(@Param('id') id: string, @Body() dto: Partial<UpdateUserDto>) {
    return this.usersService.updateUser(id, dto);
  }
}
