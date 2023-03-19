import { keywordSchema } from 'src/schemas/keyword.schema';
import { tagSchema } from 'src/schemas/tag.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { Module } from '@nestjs/common';


@Module({
  /* We bring the schemas and make it a Model to be used by our Controller and Service */
  imports: [MongooseModule.forFeature([
    {name: 'keyword', schema: keywordSchema},
    {name: 'tag', schema: tagSchema}
  ])],

  /* Controller which will receive the initial request from client */
  controllers: [TagController],
  
  /* Service will have the logical business and the conection directly with MongoDB */
  providers: [TagService]
})
export class TagModule {}
