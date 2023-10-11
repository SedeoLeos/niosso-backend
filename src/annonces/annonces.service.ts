import { Injectable } from '@nestjs/common';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { UpdateAnnonceDto } from './dto/update-annonce.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Annonce } from './entities/annonce.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnnoncesService {
  constructor(
  @InjectRepository(Annonce)
  private annonceRepository : Repository<Annonce>){}
  async create(createAnnonceDto: CreateAnnonceDto) {
    const annonce = this.annonceRepository.create({...createAnnonceDto,categorie:{id:createAnnonceDto.categorieId},user:{id:createAnnonceDto.userId}})
    return await this.annonceRepository.save(annonce);
  }

  findAll() {
    return `This action returns all annonces`;
  }

  findOne(id: number) {
    return `This action returns a #${id} annonce`;
  }

  update(id: number, updateAnnonceDto: UpdateAnnonceDto) {
    return `This action updates a #${id} annonce`;
  }

  remove(id: number) {
    return `This action removes a #${id} annonce`;
  }
}
