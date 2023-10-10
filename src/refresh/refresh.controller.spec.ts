import { Test, TestingModule } from '@nestjs/testing';
import { RefreshController } from './refresh.controller';
import { RefreshService } from './refresh.service';

describe('RefreshController', () => {
  let controller: RefreshController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefreshController],
      providers: [RefreshService],
    }).compile();

    controller = module.get<RefreshController>(RefreshController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
