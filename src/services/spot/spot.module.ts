import { categorySchema } from 'src/schemas/category.schema';
import { spotSchema } from 'src/schemas/spot.schema';
import { SpotController } from './spot.controller';
import { tagSchema } from 'src/schemas/tag.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SpotService } from './spot.service';
import { Module } from '@nestjs/common';


@Module({
  imports: [MongooseModule.forFeature([
    {name: 'spot', schema: spotSchema},
    {name: 'category', schema: categorySchema},
    {name: 'tag', schema: tagSchema}
  ])],
  providers: [SpotService],
  controllers: [SpotController]
})
export class SpotModule {}
