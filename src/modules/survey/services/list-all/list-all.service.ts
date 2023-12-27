import { Injectable } from '@nestjs/common';
import { Survey } from '../../entities/survey.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual } from 'typeorm';

interface IRequest {
  page: number;
  take: number;
  status: 'opened' | 'closed';
  votes: number;
}

@Injectable()
export class ListAllService {
  constructor(
    @InjectRepository(Survey)
    private surveysRepository: Repository<Survey>,
  ) {}

  async execute({ page, take, status, votes }: IRequest) {
    if (page < 1) {
      page = 1;
    }
    const skip = page * take - take;

    const [surveys, _] = await this.surveysRepository.findAndCount({
      take,
      skip,
      where: { status, votes: MoreThanOrEqual(votes) },
    });

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
