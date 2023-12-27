import {
  Body,
  Controller,
  Headers,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateSurveyDto } from '../dto/create-survey.dto';
import { CreateSurveyService } from '../services/create-survey/create-survey.service';
import { AuthorizationInterceptor } from 'src/core/interceptors/authorization/authorization.interceptor';

@Controller('survey')
export class SurveyController {
  constructor(private readonly createSurveyService: CreateSurveyService) {}

  @Post()
  @UseInterceptors(AuthorizationInterceptor)
  async create(@Body() payload: CreateSurveyDto, @Headers() headers) {
    const { id } = headers.user;
    return await this.createSurveyService.execute({
      data: payload,
      userId: id,
    });
  }
}
