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

  async execute() {
    return await this.surveysRepository.find({
      where: { status: 'opened' },
      order: { votes: 'DESC' },
      take: 3,
    });
  }
}
