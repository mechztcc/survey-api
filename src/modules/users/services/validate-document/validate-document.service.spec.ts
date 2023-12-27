import { Test, TestingModule } from '@nestjs/testing';
import { ValidateDocumentService } from './validate-document.service';

describe('ValidateDocumentService', () => {
  let service: ValidateDocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidateDocumentService],
    }).compile();

    service = module.get<ValidateDocumentService>(ValidateDocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
