import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from '../../entities/survey.entity';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class ListTredingService {
  constructor(
    @InjectRepository(Survey)
    private surveysRepository: Repository<Survey>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(userId: number) {
    const userExists = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!userExists) {
      throw new NotFoundException('Provided user has not found.');
    }
    const surveysWithUserVote = await this.surveysRepository
      .createQueryBuilder('survey')
      .leftJoinAndSelect(
        'survey.userVote',
        'userVote',
        'userVote.user = :userId',
        { userId },
      )
      .addSelect('userVote.id')
      .where('survey.status = :status', { status: 'opened' })
      .orderBy('survey.votes', 'DESC')
      .take(3)
      .getMany();

    return surveysWithUserVote;
  }
}
