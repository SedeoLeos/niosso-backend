import { Injectable } from '@nestjs/common';
import { CreateImageAnnonceDto } from './dto/create-image-annonce.dto';
import { UpdateImageAnnonceDto } from './dto/update-image-annonce.dto';

@Injectable()
export class ImageAnnoncesService {
  create(createImageAnnonceDto: CreateImageAnnonceDto) {
    return 'This action adds a new imageAnnonce';
  }

  findAll() {
    return `This action returns all imageAnnonces`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imageAnnonce`;
  }

  update(id: number, updateImageAnnonceDto: UpdateImageAnnonceDto) {
    return `This action updates a #${id} imageAnnonce`;
  }

  remove(id: number) {
    return `This action removes a #${id} imageAnnonce`;
  }
}
