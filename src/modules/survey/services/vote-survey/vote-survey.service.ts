import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Survey } from '../../entities/survey.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { VoteSurveyDto } from '../../dto/vote-survey.dto';
import { UserVote } from 'src/modules/users/entities/user-vote.entity';

interface IRequest {
  data: VoteSurveyDto;
  userId: number;
  surveyId: number;
}
@Injectable()
export class VoteSurveyService {
  constructor(
    @InjectRepository(Survey)
    private surveysRepository: Repository<Survey>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(UserVote)
    private voteRepository: Repository<UserVote>,

    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async execute({ data, userId, surveyId }: IRequest) {
    const userExists = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!userExists) {
      throw new NotFoundException('Provided user has not found.');
    }

    const surveyExists = await this.surveysRepository.findOne({
      where: { id: surveyId },
    });
    if (!surveyExists) {
      throw new NotFoundException('Provided survey has not found.');
    }
    if (surveyExists.status === 'closed') {
      throw new UnprocessableEntityException('Provided survey has been closed');
    }

    const userVoteExists = await this.voteRepository.findOne({
      where: { survey: { id: surveyId }, user: { id: userId } },
    });
    if (userVoteExists) {
      throw new UnprocessableEntityException(
        'It is not possible to vote more than once for the same survey',
      );
    }

    const vote = this.voteRepository.create({
      user: { id: userExists.id },
      survey: { id: surveyExists.id },
      vote: data.answer,
    });

    surveyExists.votes = surveyExists.votes + 1;

    return await this.dataSource.transaction(async (manager) => {
      manager.save(surveyExists);
      manager.save(vote);
    });
  }
}
