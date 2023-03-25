import { spotSchema } from 'src/schemas/spot.schema';
import { SpotController } from './spot.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SpotService } from './spot.service';
import { Module } from '@nestjs/common';
import { categorySchema } from 'src/schemas/category.schema';


@Module({
  imports: [MongooseModule.forFeature([
    {name: 'spot', schema: spotSchema},
    {name: 'category', schema: categorySchema}
  ])],
  providers: [SpotService],
  controllers: [SpotController]
})
export class SpotModule {}
