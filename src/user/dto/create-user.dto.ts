import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateUserDto {
  @IsString({ message: i18nValidationMessage('validation.IsString') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.IsNotEmpty') })
  firstName: string;
  @IsNotEmpty({ message: i18nValidationMessage('validation.IsNotEmpty') })
  @IsString({ message: i18nValidationMessage('validation.IsString') })
  lastname: string;
  @IsNotEmpty({ message: i18nValidationMessage('validation.IsNotEmpty') })
  @IsString({ message: i18nValidationMessage('validation.IsString') })
  phone: string;
  @IsNotEmpty({ message: i18nValidationMessage('validation.IsNotEmpty') })
  @IsString({ message: i18nValidationMessage('validation.IsString') })
  password: string;
  @IsNotEmpty({ message: i18nValidationMessage('validation.IsNotEmpty') })
  @IsString({ message: i18nValidationMessage('validation.IsString') })
  email: string;

  static factory(data: Partial<CreateUserDto>):CreateUserDto {
    const createUser = new CreateUserDto();
    if (data) {
      createUser.email = data.email;
      createUser.firstName = data.firstName;
      createUser.lastname = data.lastname;
      createUser.password = data.password;
      createUser.phone = data.phone;
    }
    return createUser;
  }
}
