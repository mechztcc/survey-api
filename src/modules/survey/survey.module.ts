import { Module } from '@nestjs/common';
import { SurveyController } from './controllers/survey.controller';
import { CreateSurveyService } from './services/create-survey/create-survey.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { User } from '../users/entities/user.entity';

@Module({
  controllers: [SurveyController],
  imports: [TypeOrmModule.forFeature([Survey, User])],
  providers: [CreateSurveyService],
})
export class SurveyModule {}
