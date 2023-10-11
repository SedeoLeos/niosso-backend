import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnnoncesService } from './annonces.service';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { UpdateAnnonceDto } from './dto/update-annonce.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ValidatorRessource } from 'src/common/validator';
import { CurrentUser } from 'src/common/decorators/current-user.decorators';
import { User } from 'src/user/entities/user.entity';

@Controller('annonces')
export class AnnoncesController {
  constructor(private readonly annoncesService: AnnoncesService) {}

  @Post()
  async create(@Body() createAnnonceDto: CreateAnnonceDto, @I18n() lang: I18nContext, @CurrentUser() user:User) {
    const validationRessource = new ValidatorRessource(lang);
    const annonce = CreateAnnonceDto.fatory(createAnnonceDto)
    annonce.userId = user.id;
    await validationRessource.register(annonce,'annonce')
    validationRessource.validate()
    return this.annoncesService.create(annonce);
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
