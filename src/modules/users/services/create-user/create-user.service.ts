import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../entities/user.entity';
import { ValidateDocumentService } from '../validate-document/validate-document.service';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private documentService: ValidateDocumentService,
  ) {}

  async execute({
    email,
    document,
    name,
    password,
  }: CreateUserDto): Promise<any> {
    const userExists = await this.usersRepository.findOne({ where: { email } });

    if (userExists) {
      throw new ConflictException('Provided User is already registered.');
    }

    if (!this.documentService.isValidCPF(document)) {
      throw new UnprocessableEntityException('Provided Document is invalid.');
    }

    const documentExists = await this.usersRepository.findOne({
      where: { document },
    });
    if (documentExists) {
      throw new ConflictException('Provided Document is already registered.');
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      email,
      document,
      name,
      password: hashedPass,
    });
    await this.usersRepository.save(user);

    return {
      ...user,
      password: null,
    };
  }
}
