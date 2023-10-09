import { Test, TestingModule } from '@nestjs/testing';
import { AnnoncesService } from './annonces.service';

describe('AnnoncesService', () => {
  let service: AnnoncesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnnoncesService],
    }).compile();

    service = module.get<AnnoncesService>(AnnoncesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
