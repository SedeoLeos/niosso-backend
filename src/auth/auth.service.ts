import { CreateAuthDto, CredentielDto } from './dto/create-auth.dto';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';
import { User } from 'src/user/entities/user.entity';
import { RefreshService } from 'src/refresh/refresh.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {


  constructor(
    private userService: UserService,
    private i18n: I18nService<I18nTranslations>,
    private refreshService: RefreshService,
  ) { }

  async register(userDto:CreateUserDto){
    return this.userService.create(userDto)
  }
  async validateAuthentification(
    inputAuth: CredentielDto,
  ): Promise<User | null> {

    const { email, password } = inputAuth;
    const user = await this.userService.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async signIn(
    credentiel: CredentielDto,
    userAgent: string,
  ): Promise<{ accessToken: string, refreshToken: string; } | undefined> {
    const user = await this.validateAuthentification(credentiel);
    if (!user) {
      throw new UnauthorizedException({
        errors: [this.i18n.translate('errors.login')],
      }, {});
    }
    const { password, ..._user } = user;
    return await this.refreshService.create(user, userAgent)
  }
  async getToken(user: User, userAgent: string) {
    const { password, ..._user } = user;
    return await this.refreshService.create(user, userAgent)
  }

  async refresh(refreshStr: string, userAgent: string): Promise<{ accessToken: string; refreshToken: string; } | undefined> {
    const refresh = await this.refreshService.findOne(refreshStr, userAgent);
    if (!refresh || !refresh.user) {
      throw new UnauthorizedException({ errors: [this.i18n.translate('errors.refresh_token')] });
    }
    await this.refreshService.remove(refresh)
    return await this.getToken(refresh.user, userAgent);
  }
 

  async checkAcess(link: string) {
    const auth = await this.refreshService.findOne(link, null, true);
    if (auth) {

      return auth;
    }
    throw new BadRequestException({ errors: [this.i18n.translate('errors.verify_reset_token')] });
  }


 


}


