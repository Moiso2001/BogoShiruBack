import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { CategorieModule } from './services/categorie/categorie.module';
import { PlanModule } from './services/plan/plan.module';
import { SpotModule } from './services/spot/spot.module';
import { TagModule } from './services/tag/tag.module';
import { UserModule } from './services/user/user.module';
import mongoConfig from './config/mongo.config';

@Module({
  imports: [

    /* We create and config our ConfigModule, passing envpath and load where we "load" our object with the env values */
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [mongoConfig]
    }), 

    /* Here is the conection with our mongo uri, the uri already have the password and username in there */
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongo.uri')
      })
    }), CategorieModule, PlanModule, SpotModule, TagModule, UserModule,

    

  ],

  controllers: [AppController],

  providers: [AppService],
})

export class AppModule {}