import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSessionService } from '../services/create-session/create-session.service';
import { CreateSessionDto } from '../dto/create-session.dto';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly createSessionService: CreateSessionService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Login has made with success',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async create(@Body() payload: CreateSessionDto) {
    return await this.createSessionService.execute(payload);
  }
}
