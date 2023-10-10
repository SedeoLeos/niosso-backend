import { Test, TestingModule } from '@nestjs/testing';
import { ImageAnnoncesService } from './image-annonces.service';

describe('ImageAnnoncesService', () => {
  let service: ImageAnnoncesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageAnnoncesService],
    }).compile();

    service = module.get<ImageAnnoncesService>(ImageAnnoncesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
