import { Module } from '@nestjs/common';
import { ImageAnnoncesService } from './image-annonces.service';
import { ImageAnnoncesController } from './image-annonces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageAnnonce } from './entities/image-annonce.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImageAnnonce])],
  controllers: [ImageAnnoncesController],
  providers: [ImageAnnoncesService],
})
export class ImageAnnoncesModule {}
