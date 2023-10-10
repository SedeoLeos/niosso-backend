import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AnnoncesModule } from './annonces/annonces.module';
import { CathegorieModule } from './cathegorie/categorie.module';
import { RefreshModule } from './refresh/refresh.module';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { ImageAnnoncesModule } from './image-annonces/image-annonces.module';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      // synchronize:true,
      migrations: [],
      entities: [],
      autoLoadEntities: true,
    }),
    // ConfigModule.forRoot({ isGlobal: true }),
    I18nModule.forRoot({
      fallbackLanguage: 'fr',
      loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      typesOutputPath: path.join(
        __dirname,
        '../src/generated/i18n.generated.ts',
      ),
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    AuthModule, UserModule, AnnoncesModule, CathegorieModule, RefreshModule, ImageAnnoncesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
