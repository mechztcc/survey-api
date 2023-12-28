import { Test, TestingModule } from '@nestjs/testing';
import { ListTredingNoAuthService } from './list-treding-no-auth.service';

describe('ListTredingNoAuthService', () => {
  let service: ListTredingNoAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListTredingNoAuthService],
    }).compile();

    service = module.get<ListTredingNoAuthService>(ListTredingNoAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
