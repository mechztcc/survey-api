import { Module } from '@nestjs/common';
import { SurveyController } from './controllers/survey.controller';
import { CreateSurveyService } from './services/create-survey/create-survey.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { User } from '../users/entities/user.entity';
import { VoteSurveyService } from './services/vote-survey/vote-survey.service';
import { UserVote } from '../users/entities/user-vote.entity';
import { ListTredingService } from './services/list-treding/list-treding.service';

@Module({
  controllers: [SurveyController],
  imports: [TypeOrmModule.forFeature([Survey, User, UserVote])],
  providers: [CreateSurveyService, VoteSurveyService, ListTredingService],
})
export class SurveyModule {}
