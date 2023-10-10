import { Module } from '@nestjs/common';
import { RefreshService } from './refresh.service';
import { RefreshController } from './refresh.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Refresh } from './entities/refresh.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Refresh])],
  controllers: [RefreshController],
  providers: [RefreshService],
  exports: [RefreshService],
})
export class RefreshModule {}
