import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
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
import { UniqueConstraintTypeOrm } from './common/decorators/unique.decorators';
import { ExistConstraintTypeOrm } from './common/decorators/exist.decorators';
import { AuthMiddleware } from './auth/auth.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global:true,
      secret: process.env.ACCESS_SECRET,
      signOptions: { expiresIn: process.env.ACCESS_DURETION },
    }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      synchronize: true,
      migrations: [],
      entities: [],
      autoLoadEntities: true,
    }),
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
    AuthModule,
    UserModule,
    AnnoncesModule,
    CathegorieModule,
    RefreshModule,
    ImageAnnoncesModule,
  ],
  controllers: [AppController],
  providers: [AppService,UniqueConstraintTypeOrm,ExistConstraintTypeOrm],
  exports: [UniqueConstraintTypeOrm,ExistConstraintTypeOrm]
})
export class AppModule  implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude('auth/(.*)')
    .forRoutes('*');
  }
}