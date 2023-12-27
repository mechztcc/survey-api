import { Test, TestingModule } from '@nestjs/testing';
import { CreateSurveyService } from './create-survey.service';

describe('CreateSurveyService', () => {
  let service: CreateSurveyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateSurveyService],
    }).compile();

    service = module.get<CreateSurveyService>(CreateSurveyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
