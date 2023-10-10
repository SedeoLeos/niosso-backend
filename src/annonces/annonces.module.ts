import { Module } from '@nestjs/common';
import { AnnoncesService } from './annonces.service';
import { AnnoncesController } from './annonces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Annonce } from './entities/annonce.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Annonce])],
  controllers: [AnnoncesController],
  providers: [AnnoncesService],
})
export class AnnoncesModule {}
