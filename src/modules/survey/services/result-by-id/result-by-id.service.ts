import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserVote } from 'src/modules/users/entities/user-vote.entity';
import { Repository } from 'typeorm';
import { Survey } from '../../entities/survey.entity';

@Injectable()
export class ResultByIdService {
  constructor(
    @InjectRepository(UserVote)
    private votesRepository: Repository<UserVote>,

    @InjectRepository(Survey)
    private surveysRepository: Repository<Survey>,
  ) {}

  async execute(id: number) {
    const surveyExists = await this.surveysRepository.findOne({
      where: { id },
    });

    if (!surveyExists) {
      throw new NotFoundException('Provided survey has not found');
    }
    const surveyVotes = await this.votesRepository
      .createQueryBuilder('userVote')
      .select('survey.id', 'surveyId')
      .addSelect(
        "COUNT(CASE WHEN userVote.vote = 'yes' THEN 1 ELSE NULL END)",
        'yesCount',
      )
      .addSelect(
        "COUNT(CASE WHEN userVote.vote = 'no' THEN 1 ELSE NULL END)",
        'noCount',
      )
      .addSelect(
        "SUM(CASE WHEN userVote.vote IN ('yes', 'no') THEN 1 ELSE 0 END)",
        'totalCount',
      )
      .addSelect(
        "CAST((COUNT(CASE WHEN userVote.vote = 'yes' THEN 1 ELSE NULL END) * 100.0) / SUM(CASE WHEN userVote.vote IN ('yes', 'no') THEN 1 ELSE 0 END) AS DECIMAL(10,2))",
        'yesPercentage',
      )
      .addSelect(
        "CAST((COUNT(CASE WHEN userVote.vote = 'no' THEN 1 ELSE NULL END) * 100.0) / SUM(CASE WHEN userVote.vote IN ('yes', 'no') THEN 1 ELSE 0 END) AS DECIMAL(10,2))",
        'noPercentage',
      )
      .leftJoin('userVote.survey', 'survey')
      .where('survey.status = :status', { status: 'opened' })
      .andWhere('survey.id = :surveyId', { surveyId: id }) // Filtra pelo ID da Survey
      .groupBy('survey.id')
      .getRawOne();

    return surveyVotes;
  }
}
