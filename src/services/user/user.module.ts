import { userSchema } from 'src/schemas/user.schema';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';


@Module({
  imports: [MongooseModule.forFeature([{name: 'user', schema: userSchema}])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
