import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { RefreshModule } from 'src/refresh/refresh.module';

@Module({
  imports: [UserModule, RefreshModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
