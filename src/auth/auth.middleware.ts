import { ExecutionContext, Inject, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { I18nTranslations } from 'src/generated/i18n.generated';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private i18n: I18nService<I18nTranslations>,
    private readonly reflector: Reflector,
   ) {}
  
  async use(req: any, res: any, next: () => void) {
    
    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException({
        errors: [this.i18n.translate('errors.token_expired')],
      });
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      const _user = await this.userService.findOne( payload.userId );
      if (_user) {
        const { password, createdAt, updatedAt, ...user } = _user;

        req['user'] = user;
        next()
      }
      if (!_user) {
        console.log(' 6666666666666666666666')
        throw new UnauthorizedException({
          errors: [this.i18n.translate('errors.token_expired')],
        });
      }
    } catch {
      console.log("++++++++++++++++++")
      throw new UnauthorizedException({
        errors: [this.i18n.translate('errors.token_expired')],
      });
    }
    next();
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const headers = request.headers as any;
    const [type, token] = headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}
