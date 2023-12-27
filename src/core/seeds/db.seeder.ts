import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DbSeeder {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async execute() {
    const dummy: User[] = [];
    for (let index = 0; index < 10; index++) {
      dummy.push({
        document: '09174489445',
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: faker.internet.password(),
        surveys: [],
        userVote: [],
      });
    }

    const users = this.usersRepository.insert([...dummy]);
    return users;
  }
}
