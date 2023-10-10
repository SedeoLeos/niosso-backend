import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnnoncesService } from './annonces.service';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { UpdateAnnonceDto } from './dto/update-annonce.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ValidatorRessource } from 'src/common/validator';

@Controller('annonces')
export class AnnoncesController {
  constructor(private readonly annoncesService: AnnoncesService) {}

  @Post()
  async create(@Body() createAnnonceDto: CreateAnnonceDto,@I18n() lang: I18nContext) {
    const validationRessource = new ValidatorRessource(lang);
    await validationRessource.register(CreateAnnonceDto.fatory(createAnnonceDto),'annonce')
    validationRessource.validate()
    return this.annoncesService.create(createAnnonceDto);
  }

  @Get()
  findAll() {
    return this.annoncesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.annoncesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnnonceDto: UpdateAnnonceDto) {
    return this.annoncesService.update(+id, updateAnnonceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.annoncesService.remove(+id);
  }
}
