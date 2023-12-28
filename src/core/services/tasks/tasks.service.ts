import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from 'src/modules/survey/entities/survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Survey)
    private surveysRepository: Repository<Survey>,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron() {
    const surveys = await this.surveysRepository
      .createQueryBuilder()
      .update(Survey)
      .set({ status: 'closed' })
      .where('status = :status AND expires_at < :currentDateTime', {
        status: 'opened',
        currentDateTime: new Date().toISOString(),
      })
      .execute();
      
      this.logger.debug(`Updated ${surveys.affected} expired surveys`)
  }
}
