import { categorySchema } from 'src/schemas/category.schema';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({

  /* We bring the schema category and make it a Model to be used by our Controller and Service */
  imports: [MongooseModule.forFeature([
    {name: 'category', schema: categorySchema}
  ])],

  /* Controller which will receive the initial request from client */
  controllers: [CategoryController],

  /* Service will have the logical business and the conection directly with MongoDB */
  providers: [CategoryService]
  
})

export class CategoryModule {}
