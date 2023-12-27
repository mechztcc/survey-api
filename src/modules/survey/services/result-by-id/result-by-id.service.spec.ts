import { Test, TestingModule } from '@nestjs/testing';
import { ResultByIdService } from './result-by-id.service';

describe('ResultByIdService', () => {
  let service: ResultByIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResultByIdService],
    }).compile();

    service = module.get<ResultByIdService>(ResultByIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
