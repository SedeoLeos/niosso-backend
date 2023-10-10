import { Test, TestingModule } from '@nestjs/testing';
import { ImageAnnoncesController } from './image-annonces.controller';
import { ImageAnnoncesService } from './image-annonces.service';

describe('ImageAnnoncesController', () => {
  let controller: ImageAnnoncesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageAnnoncesController],
      providers: [ImageAnnoncesService],
    }).compile();

    controller = module.get<ImageAnnoncesController>(ImageAnnoncesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
