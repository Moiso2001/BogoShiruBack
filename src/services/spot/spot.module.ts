import { categorySchema } from 'src/schemas/category.schema';
import { spotSchema } from 'src/schemas/spot.schema';
import { SpotController } from './spot.controller';
import { tagSchema } from 'src/schemas/tag.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SpotService } from './spot.service';
import { Module } from '@nestjs/common';
import { keywordSchema } from 'src/schemas/keyword.schema';


@Module({
  imports: [MongooseModule.forFeature([
    {name: 'category', schema: categorySchema},
    {name: 'keyword', schema: keywordSchema},
    {name: 'spot', schema: spotSchema},
    {name: 'tag', schema: tagSchema},
    {name: 'category', schema: categorySchema}
  ])],
  providers: [SpotService],
  controllers: [SpotController]
})
export class SpotModule {}
