import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(): Promise<any> {
    return await this.usersRepository.find();
  }
}
