import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserService } from './services/create-user/create-user.service';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [CreateUserService],
})
export class UsersModule {}
