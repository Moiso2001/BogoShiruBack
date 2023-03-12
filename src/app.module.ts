import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
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
    }),

    

  ],

  controllers: [AppController],

  providers: [AppService],
})

export class AppModule {}