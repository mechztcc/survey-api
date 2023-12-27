import { Test, TestingModule } from '@nestjs/testing';
import { CreateSessionService } from './create-session.service';

describe('CreateSessionService', () => {
  let service: CreateSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateSessionService],
    }).compile();

    service = module.get<CreateSessionService>(CreateSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
