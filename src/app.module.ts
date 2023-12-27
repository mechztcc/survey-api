import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeedsModule } from './core/seeds/seeds.module';
import { User } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SurveyModule } from './modules/survey/survey.module';
import { Survey } from './modules/survey/entities/survey.entity';
import { UserVote } from './modules/users/entities/user-vote.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      entities: [User, Survey, UserVote],
      synchronize: false,
    }),
    UsersModule,
    SeedsModule,
    AuthModule,
    SurveyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
