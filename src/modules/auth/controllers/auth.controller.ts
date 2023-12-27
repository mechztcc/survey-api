import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSessionService } from '../services/create-session/create-session.service';
import { CreateSessionDto } from '../dto/create-session.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly createSessionService: CreateSessionService) {}

  @Post()
  async create(@Body() payload: CreateSessionDto) {
    return await this.createSessionService.execute(payload);
  }
}
