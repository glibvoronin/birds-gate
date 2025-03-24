import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthenticatedJwtRequest } from '@birds-gate/util-interfaces';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '@birds-gate/util-interfaces';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  getUsers(@Req() req: AuthenticatedJwtRequest) {
    return this.usersService.findAll();
  }

  @Post('')
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }
}
