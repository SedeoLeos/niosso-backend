import { Test, TestingModule } from '@nestjs/testing';
import { AnnoncesController } from './annonces.controller';
import { AnnoncesService } from './annonces.service';

describe('AnnoncesController', () => {
  let controller: AnnoncesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnnoncesController],
      providers: [AnnoncesService],
    }).compile();

    controller = module.get<AnnoncesController>(AnnoncesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
