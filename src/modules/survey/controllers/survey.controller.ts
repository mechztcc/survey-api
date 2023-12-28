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
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
@ApiTags('survey')
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
  @ApiHeader({
    name: 'Authorization',
    description: 'Token de autorização JWT',
  })
  @UseInterceptors(AuthorizationInterceptor)
  @ApiCreatedResponse({ description: 'Created survey with success' })
  @ApiNotFoundResponse({ description: 'Provided user has not found' })
  async create(@Body() payload: CreateSurveyDto, @Headers() headers) {
    const { id } = headers.user;
    return await this.createSurveyService.execute({
      data: payload,
      userId: id,
    });
  }

  @Post('vote/:id')
  @ApiHeader({
    name: 'Authorization',
    description: 'Token de autorização JWT',
  })
  @ApiCreatedResponse({ description: 'Votation has processed with success' })
  @ApiNotFoundResponse({ description: 'Provided user has not found' })
  @ApiNotFoundResponse({ description: 'Provided survey has not found' })
  @ApiUnprocessableEntityResponse({
    description: 'Provided survey has been closed',
  })
  @ApiUnprocessableEntityResponse({
    description:
      'It is not possible to vote more than once for the same survey',
  })
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
  @ApiHeader({
    name: 'Authorization',
    description: 'Token de autorização JWT',
  })
  @ApiNotFoundResponse({ description: 'Provided user has not found' })
  @ApiOkResponse({ description: 'The request has been processed with success' })
  @UseInterceptors(AuthorizationInterceptor)
  async listTrending(@Headers() headers) {
    const { id } = headers.user;
    return await this.listTrendingService.execute(id);
  }

  @Get('/trending')
  @ApiOkResponse({ description: 'The request has been processed with success' })
  async listTrendingNoAuth() {
    return await this.listTrendingNoAuthService.execute();
  }

  @Get('/:id/info')
  @ApiOkResponse({ description: 'The request has been processed with success' })
  @ApiNotFoundResponse({ description: 'Provided survey has not found' })
  async infoBySurvey(@Param('id') id: string) {
    return await this.resultByIdService.execute(Number(id));
  }

  @Get('/list')
  @ApiOkResponse({ description: 'The request has been processed with success' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Token de autorização JWT',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'votes', required: false, type: Number })
  @ApiQuery({ name: 'order', required: false, enum: ['ASC', 'DESC'] })
  @UseInterceptors(AuthorizationInterceptor)
  async listAll(@Query() query, @Headers() headers) {
    const { id } = headers.user;

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
      userId: id,
    });
  }
}
