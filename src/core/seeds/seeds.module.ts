import { Module } from '@nestjs/common';
import { DbSeeder } from './db.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Survey } from 'src/modules/survey/entities/survey.entity';
import { UserVote } from 'src/modules/users/entities/user-vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Survey,UserVote])],
  providers: [DbSeeder],
  exports: [DbSeeder],
})
export class SeedsModule {}
