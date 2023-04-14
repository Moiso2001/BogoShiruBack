import { spotSchema } from 'src/schemas/spot.schema';
import { planSchema } from 'src/schemas/plan.schema';
import { PlanController } from './plan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanService } from './plan.service';
import { Module } from '@nestjs/common'; 
import { keywordSchema } from 'src/schemas/keyword.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'keyword', schema: keywordSchema},
    {name: 'plan', schema: planSchema},
    {name: 'spot', schema: spotSchema}
  ])],
  controllers: [PlanController],
  providers: [PlanService]
})
export class PlanModule {}
