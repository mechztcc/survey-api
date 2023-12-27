import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserService } from './services/create-user/create-user.service';
import { ValidateDocumentService } from './services/validate-document/validate-document.service';
import { Survey } from '../survey/entities/survey.entity';
import { UserVote } from './entities/user-vote.entity';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User, Survey, UserVote])],
  providers: [CreateUserService, ValidateDocumentService],
})
export class UsersModule {}
