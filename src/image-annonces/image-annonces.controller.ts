import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImageAnnoncesService } from './image-annonces.service';
import { CreateImageAnnonceDto } from './dto/create-image-annonce.dto';
import { UpdateImageAnnonceDto } from './dto/update-image-annonce.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ValidatorRessource } from 'src/common/validator';

@Controller('image-annonces')
export class ImageAnnoncesController {
  constructor(private readonly imageAnnoncesService: ImageAnnoncesService) {}

  @Post()
  create(@Body() createImageAnnonceDto: CreateImageAnnonceDto,@I18n() lang:I18nContext) {
    const vlRessource = new ValidatorRessource(lang);
    return this.imageAnnoncesService.create(createImageAnnonceDto);
  }

  @Get()
  findAll() {
    return this.imageAnnoncesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageAnnoncesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageAnnonceDto: UpdateImageAnnonceDto) {
    return this.imageAnnoncesService.update(+id, updateImageAnnonceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageAnnoncesService.remove(+id);
  }
}
