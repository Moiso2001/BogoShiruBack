import { tagSchema } from 'src/schemas/tag.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { Module } from '@nestjs/common';


@Module({
  imports: [MongooseModule.forFeature([{name: 'tag', schema: tagSchema}])],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
