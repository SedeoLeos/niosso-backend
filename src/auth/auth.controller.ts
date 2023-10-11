import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Headers,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentielDto, RefreshTokenDto } from './dto/create-auth.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ValidatorRessource } from 'src/common/validator';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() input: CredentielDto,
    @Headers('user-agent') userAgent: string,
    @I18n() lang: I18nContext,
  ) {
    const vlRessource = new ValidatorRessource(lang);
    const auth = CredentielDto.factory(input);
    await vlRessource.register(auth);
    vlRessource.validate();
    return this.authService.signIn(auth, userAgent);
  }

  @Post('refresh')
  async refreshToken(
    @Body() input: RefreshTokenDto,
    @Headers('user-agent') userAgent: string,
    @I18n() lang: I18nContext,
  ) {
    const vlRessource = new ValidatorRessource(lang);
    const refreshDto = RefreshTokenDto.factory(input);
    await vlRessource.register(refreshDto, 'refresh');
    vlRessource.validate();

    const playload = await this.authService.refresh(
      refreshDto.token,
      userAgent,
    );
    return playload;
  }
  @Post('register')
  async register(@Body() userDto: CreateUserDto, @I18n() lang: I18nContext) {
    const validationRessorce = new ValidatorRessource(lang);
    const createUserDto = CreateUserDto.factory(userDto);
    await validationRessorce.register(createUserDto);
    validationRessorce.validate();
    return await this.authService.register(createUserDto);
  }
}
