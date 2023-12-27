import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from '../../entities/survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListTredingService {
  constructor(
    @InjectRepository(Survey)
    private surveysRepository: Repository<Survey>,
  ) {}

  async execute(userId: number) {
    const surveysWithUserVote = await this.surveysRepository
      .createQueryBuilder('survey')
      .leftJoinAndSelect(
        'survey.userVote',
        'userVote',
        'userVote.user = :userId',
        { userId },
      )
      .where('survey.status = :status', { status: 'opened' })
      .orderBy('survey.votes', 'DESC')
      .take(3)
      .getMany();

    return surveysWithUserVote;
  }
}
