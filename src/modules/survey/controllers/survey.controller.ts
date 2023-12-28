import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AuthorizationInterceptor } from 'src/core/interceptors/authorization/authorization.interceptor';
import { ListTredingNoAuthService } from 'src/modules/survey/services/list-treding-no-auth/list-treding-no-auth.service';
import { CreateSurveyDto } from '../dto/create-survey.dto';
import { VoteSurveyDto } from '../dto/vote-survey.dto';
import { CreateSurveyService } from '../services/create-survey/create-survey.service';
import { ListAllService } from '../services/list-all/list-all.service';
import { ListTredingService } from '../services/list-treding/list-treding.service';
import { ResultByIdService } from '../services/result-by-id/result-by-id.service';
import { VoteSurveyService } from '../services/vote-survey/vote-survey.service';

@Controller('survey')
export class SurveyController {
  constructor(
    private readonly createSurveyService: CreateSurveyService,
    private readonly voteSurveyService: VoteSurveyService,
    private readonly listTrendingService: ListTredingService,
    private readonly listTrendingNoAuthService: ListTredingNoAuthService,
    private readonly resultByIdService: ResultByIdService,
    private readonly listAllService: ListAllService,
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

  @Get('/trending/auth')
  @UseInterceptors(AuthorizationInterceptor)
  async listTrending(@Headers() headers) {
    const { id } = headers.user;
    return await this.listTrendingService.execute(id);
  }

  @Get('/trending')
  async listTrendingNoAuth() {
    return await this.listTrendingNoAuthService.execute();
  }

  @Get('/:id/info')
  async infoBySurvey(@Param('id') id: string) {
    return await this.resultByIdService.execute(Number(id));
  }

  @Get('/list')
  async listAll(@Query() query) {
    const params = {
      page: query['page'] ?? 1,
      take: query['take'] ?? 10,
      status: query['status'] ?? 'opened',
      votes: query['votes'] ?? 0,
      order: query['order'] ?? 'ASC',
    };

    return await this.listAllService.execute({
      page: Number(params.page),
      take: Number(params.take),
      status: params.status,
      votes: params.votes,
      order: params.order,
    });
  }
}
