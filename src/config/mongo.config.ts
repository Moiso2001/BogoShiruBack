import { registerAs } from '@nestjs/config';

/* We set a object with the env variables settled by our run command and export it to our app.module.ts */
export default registerAs('mongo', () => ({
  uri: process.env.MONGO_URI,
}));