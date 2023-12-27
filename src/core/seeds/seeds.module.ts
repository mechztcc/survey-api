import { Module } from '@nestjs/common';
import { DbSeeder } from './db.seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [DbSeeder],
  exports: [DbSeeder],
})
export class SeedsModule {}
