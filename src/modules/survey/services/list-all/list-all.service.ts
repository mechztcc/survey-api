import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from '../../entities/survey.entity';

interface IRequest {
  page: number;
  take: number;
  status: 'opened' | 'closed';
  votes: number;
  order: 'ASC' | 'DESC';
  userId: number;
}

@Injectable()
export class ListAllService {
  constructor(
    @InjectRepository(Survey)
    private surveysRepository: Repository<Survey>,
  ) {}

  async execute({ page, take, status, votes, order, userId }: IRequest) {
    if (page < 1) {
      page = 1;
    }
    const skip = page * take - take;

    const [surveys, _] = await this.surveysRepository
      .createQueryBuilder('survey')
      .leftJoinAndSelect(
        'survey.userVote',
        'userVote',
        'userVote.user = :userId',
        { userId },
      )
      .where('survey.status = :status AND survey.votes >= :votes', {
        status,
        votes,
      })
      .orderBy('survey.votes', order)
      .take(take)
      .skip(skip)
      .getManyAndCount();

    const totalSurveys = await this.surveysRepository.count();
    const totalPages = Math.ceil(totalSurveys / take);
    const prevPage = page > 1 ? page - 1 : null;
    const nextPage = page < totalPages ? page + 1 : null;

    return {
      data: surveys,
      totalItems: totalSurveys,
      totalPages,
      prevPage,
      nextPage,
    };
  }
}
