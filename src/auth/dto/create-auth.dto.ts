import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';

export class CreateAuthDto {}

export class CredentielDto {
  @IsEmail(
    {},
    { message: i18nValidationMessage<I18nTranslations>('validation.IsEmail') },
  )
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.IsNotEmpty'),
  })
email: string;

  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.IsNotEmpty'),
  })
  @MinLength(4, {
    message: i18nValidationMessage<I18nTranslations>('validation.MinLength'),
  })
  password: string;

  static factory(data: Partial<CredentielDto>):CredentielDto{
    const credentiel = new CredentielDto();
    if(data){
       credentiel.email = data.email;
       credentiel.password = data.password;
    }
    return credentiel;
  }
}

export class RefreshTokenDto {
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.IsString'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.IsNotEmpty'),
  })
  token: string;
  static factory(data: Partial<RefreshTokenDto>):RefreshTokenDto{
    const refresh = new RefreshTokenDto();
    if(data){
        refresh.token = data.token;
    }
    return refresh;
  }
}
