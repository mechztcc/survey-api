import { Test, TestingModule } from '@nestjs/testing';
import { ListTredingService } from './list-treding.service';

describe('ListTredingService', () => {
  let service: ListTredingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListTredingService],
    }).compile();

    service = module.get<ListTredingService>(ListTredingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
