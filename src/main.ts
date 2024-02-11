//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import { ConfigService } from '@nestjs/config/dist';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS } from './constants';
import * as morgan from "morgan"

async function bootstrap() {

  /* Initialization of our NestFactory */
  const app = await NestFactory.create(AppModule);

  /* Middleware to show errors and each consult in our terminal */
  app.use(morgan('dev'));

  /* .env variable */
  const configService = app.get(ConfigService);

  /* CORS options brought from our constants folder */
  app.enableCors(CORS);

  /* Prefix used in our api route, this will help to set versions ex: localhost:3001/(prefix)/(routes) */
  app.setGlobalPrefix('beta');

  /* Run app listening our port from our .env file */
  await app.listen(configService.get('PORT'));
  console.log(`Application running on: ${await app.getUrl()}`)
}

bootstrap();
