import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from 'src/modules/survey/entities/survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListTredingNoAuthService {
  constructor(
    @InjectRepository(Survey)
    private surveysRepository: Repository<Survey>,
  ) {}

  async execute() {
    const surveysWithUserVote = await this.surveysRepository
      .createQueryBuilder('survey')
      .where('survey.status = :status', { status: 'opened' })
      .orderBy('survey.votes', 'DESC')
      .take(3)
      .getMany();

    return surveysWithUserVote;
  }
}
