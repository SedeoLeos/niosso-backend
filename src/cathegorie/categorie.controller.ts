import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';

@Controller('categorie')
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}

  @Post()
  create(@Body() createCategorieDto: CreateCategorieDto) {
    return this.categorieService.create(createCategorieDto);
  }

  @Get()
  findAll() {
    return this.categorieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categorieService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategorieDto: UpdateCategorieDto) {
    return this.categorieService.update(+id, updateCategorieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categorieService.remove(+id);
  }
}
