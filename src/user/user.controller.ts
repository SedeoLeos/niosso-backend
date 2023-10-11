import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginRequest } from 'src/common/utils';
import { ValidatorRessource } from 'src/common/validator';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CurrentUser } from 'src/common/decorators/current-user.decorators';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async create(@CurrentUser() user:User) {
    return user;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }


  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

}
