import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserVote } from 'src/modules/users/entities/user-vote.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResultByIdService {
  constructor(
    @InjectRepository(UserVote)
    private votesRepository: Repository<UserVote>,
  ) {}

  async execute(id: number) {
    const surveyVotes = await this.votesRepository
    .createQueryBuilder('userVote')
    .select('survey.id', 'surveyId')
    .addSelect('COUNT(CASE WHEN userVote.vote = \'yes\' THEN 1 ELSE NULL END)', 'yesCount')
    .addSelect('COUNT(CASE WHEN userVote.vote = \'no\' THEN 1 ELSE NULL END)', 'noCount')
    .leftJoin('userVote.survey', 'survey')
    .where('survey.status = :status', { status: 'opened' })
    .andWhere('survey.id = :surveyId', { surveyId: id })
    .groupBy('survey.id')
    .getRawOne();

    return surveyVotes;
  }
}
