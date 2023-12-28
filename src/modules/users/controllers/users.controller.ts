import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserService } from '../services/create-user/create-user.service';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly createUsersService: CreateUserService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Created user with success' })
  @ApiBadRequestResponse({ description: 'Provided User is already registered' })
  @ApiConflictResponse({
    description: 'Provided Document is already registered',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Provided Document is invalid',
  })
  async create(@Body() payload: CreateUserDto) {
    return await this.createUsersService.execute(payload);
  }
}
