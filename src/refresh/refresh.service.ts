import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { verify } from 'jsonwebtoken';
// import { JwtService } from '@nestjs/jwt';
import { Refresh } from './entities/refresh.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RefreshService {
  constructor(
    @InjectRepository(Refresh)
    private refreshRepository: Repository<Refresh>,
    // private jwtService: JwtService,
  ) {}
  async create(
    user: User,
    userAgent: string,
    reset = false,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    scope: string;
    AccessDuretion: string;
    RefreshDuretion: string;
  }> {
    const newrefreshToken = new Refresh();
    newrefreshToken.user = user;
    newrefreshToken.userAgent = userAgent;
    newrefreshToken.reseted = reset;
    const instance = this.refreshRepository.create(newrefreshToken);

    const refreshToken = await this.refreshRepository.save(instance);
    return {
      scope: 'user',
      AccessDuretion: '10h',
      RefreshDuretion: '30J',
      refreshToken: refreshToken.sign,
      accessToken:""
      //  this.jwtService.sign({
      //   userId: user.id,
      //   userInfo: user.profile,
      // }),
    };
  }

  async removeToken(id: number, reseted: boolean) {
    const all = await this.refreshRepository.delete({ reseted, user: { id } });
  }

  async findOne(
    refreshStr: string,
    userAgent = 'Default',
    reset = false,
  ): Promise<Refresh | undefined> {
    try {
      let decoded: any;
      if (!reset) {
        decoded = verify(refreshStr, process.env.REFRESH_SECRET);
      }
      if (reset) {
        decoded = verify(refreshStr, process.env.RESET_SECRET);
      }
      if (typeof decoded === 'string') {
        console.log(typeof decoded === 'string');
        return undefined;
      }
      const refresh = await this.refreshRepository.findOne({
        where: { id: decoded.id, userAgent: decoded.userAgent },
        relations: { user: true },
      });
      if (!refresh) {
        console.log(refresh);
        return undefined;
      }
      if (refresh.reseted) {
        return refresh;
      }
      if (userAgent === decoded.userAgent && !refresh.reseted) {
        console.log(typeof decoded === 'string');
        return refresh;
      }
      return undefined;
    } catch (e) {
      console.log('+++++++++++++++++', e);
      return undefined;
    }
  }

  async remove(refresh: Refresh) {
    console.log('RRR');
    return await this.refreshRepository.delete({ id: refresh.id });
  }
}
