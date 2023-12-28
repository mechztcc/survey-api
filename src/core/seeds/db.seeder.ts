import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from 'src/modules/survey/entities/survey.entity';
import {
  UserVote,
  VoteAnswer,
} from 'src/modules/users/entities/user-vote.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository, getConnection } from 'typeorm';

@Injectable()
export class DbSeeder {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Survey)
    private surveysRepository: Repository<Survey>,

    @InjectRepository(UserVote)
    private votesRepository: Repository<UserVote>,
  ) {}
  async execute() {
    const surveysToInsert = [];

    const user: User = {
      document: '09174489445',
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      profile: 'guest',
      surveys: [],
      userVote: [],
    };

    this.usersRepository.create(user);
    await this.usersRepository.save(user);

    for (let i = 0; i < 10; i++) {
      const survey: Survey = {
        question: faker.lorem.sentence(),
        expires_at: faker.date.future(),
        votes: 0,
        user,
        userVote: [],
        status: 'opened',
      };
      surveysToInsert.push(survey);
    }

    await this.surveysRepository
      .createQueryBuilder()
      .insert()
      .into('survey') // Nome da tabela 'survey'
      .values(surveysToInsert)
      .execute();
  }
}
