import { Module } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CategorieController } from './categorie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorie } from './entities/cathegorie.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Categorie])],
  controllers: [CategorieController],
  providers: [CategorieService],
})
export class CathegorieModule {}
