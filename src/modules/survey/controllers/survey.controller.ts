import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthorizationInterceptor } from 'src/core/interceptors/authorization/authorization.interceptor';
import { CreateSurveyDto } from '../dto/create-survey.dto';
import { VoteSurveyDto } from '../dto/vote-survey.dto';
import { CreateSurveyService } from '../services/create-survey/create-survey.service';
import { VoteSurveyService } from '../services/vote-survey/vote-survey.service';
import { ListTredingService } from '../services/list-treding/list-treding.service';

@Controller('survey')
export class SurveyController {
  constructor(
    private readonly createSurveyService: CreateSurveyService,
    private readonly voteSurveyService: VoteSurveyService,
    private readonly listTrendingService: ListTredingService,
  ) {}

  @Post()
  @UseInterceptors(AuthorizationInterceptor)
  async create(@Body() payload: CreateSurveyDto, @Headers() headers) {
    const { id } = headers.user;
    return await this.createSurveyService.execute({
      data: payload,
      userId: id,
    });
  }

  @Post('vote/:id')
  @UseInterceptors(AuthorizationInterceptor)
  async vote(
    @Body() payload: VoteSurveyDto,
    @Headers() headers: any,
    @Param('id') surveyId: string,
  ) {
    const { id } = headers.user;
    return await this.voteSurveyService.execute({
      data: payload,
      userId: id,
      surveyId: Number(surveyId),
    });
  }

  @Get()
  @UseInterceptors(AuthorizationInterceptor)
  async listTrending(@Headers() headers) {
    const { id } = headers.user;

    return await this.listTrendingService.execute(id);
  }
}
