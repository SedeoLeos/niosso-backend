import { Test, TestingModule } from '@nestjs/testing';
import { CategorieController } from './categorie.controller';
import { CategorieService } from './categorie.service';

describe('CathegorieController', () => {
  let controller: CategorieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategorieController],
      providers: [CategorieService],
    }).compile();

    controller = module.get<CategorieController>(CategorieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
