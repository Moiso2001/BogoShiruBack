import { planSchema } from 'src/schemas/plan.schema';
import { PlanController } from './plan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanService } from './plan.service';
import { Module } from '@nestjs/common'; 

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'plan', schema: planSchema}
  ])],
  controllers: [PlanController],
  providers: [PlanService]
})
export class PlanModule {}
