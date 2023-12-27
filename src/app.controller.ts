import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DbSeeder } from './core/seeds/db.seeder';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly seeder: DbSeeder,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('seeder')
  async populateDb() {
    await this.seeder.execute();
  }
}
