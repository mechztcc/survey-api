import {
  Body,
  Controller,
  Headers,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateSurveyDto } from '../dto/create-survey.dto';
import { CreateSurveyService } from '../services/create-survey/create-survey.service';
import { AuthorizationInterceptor } from 'src/core/interceptors/authorization/authorization.interceptor';
import { VoteAnswer } from 'src/modules/users/entities/user-vote.entity';
import { VoteSurveyService } from '../services/vote-survey/vote-survey.service';
import { VoteSurveyDto } from '../dto/vote-survey.dto';

@Controller('survey')
export class SurveyController {
  constructor(
    private readonly createSurveyService: CreateSurveyService,
    private readonly voteSurveyService: VoteSurveyService,
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
}
