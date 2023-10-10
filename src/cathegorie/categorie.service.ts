import { Injectable } from '@nestjs/common';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';

@Injectable()
export class CategorieService {
  create(createCategorieDto: CreateCategorieDto) {
    return 'This action adds a new cathegorie';
  }

  findAll() {
    return `This action returns all cathegorie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cathegorie`;
  }

  update(id: number, updateCategorieDto: UpdateCategorieDto) {
    return `This action updates a #${id} cathegorie`;
  }

  remove(id: number) {
    return `This action removes a #${id} cathegorie`;
  }
}
