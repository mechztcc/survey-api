import { Test, TestingModule } from '@nestjs/testing';
import { VoteSurveyService } from './vote-survey.service';

describe('VoteSurveyService', () => {
  let service: VoteSurveyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoteSurveyService],
    }).compile();

    service = module.get<VoteSurveyService>(VoteSurveyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
