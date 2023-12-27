import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserService } from '../services/create-user/create-user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly createUsersService: CreateUserService) {}

  @Post()
  async create(@Body() payload: CreateUserDto) {
    return await this.createUsersService.execute(payload);
  }
}
