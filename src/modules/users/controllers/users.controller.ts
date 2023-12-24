import { Controller, Get } from '@nestjs/common';
import { CreateUserService } from '../services/create-user/create-user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly createUsersService: CreateUserService) {}

  @Get()
  async test() {
    return await this.createUsersService.execute();
  }
}
