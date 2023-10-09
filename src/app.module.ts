import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AnnoncesModule } from './annonces/annonces.module';
import { CathegorieModule } from './cathegorie/cathegorie.module';

@Module({
  imports: [AuthModule, UserModule, AnnoncesModule, CathegorieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
