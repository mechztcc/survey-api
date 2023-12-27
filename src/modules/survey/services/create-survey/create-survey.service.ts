import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSurveyDto } from '../../dto/create-survey.dto';
import { Survey } from '../../entities/survey.entity';
import { User } from 'src/modules/users/entities/user.entity';

interface IRequest {
  data: CreateSurveyDto;
  userId: number;
}

@Injectable()
export class CreateSurveyService {
  constructor(
    @InjectRepository(Survey)
    private surveysRepository: Repository<Survey>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async execute({ data, userId: id }: IRequest) {
    const userExists = await this.usersRepository.findOne({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException('Provided user has not found.');
    }
    const survey = this.surveysRepository.create({
      expires_at: data.expiresAt,
      question: data.question,
      user: { id: userExists.id },
    });

    return await this.surveysRepository.save(survey);
  }
}
