import { categorySchema } from 'src/schemas/category.schema';
import { keywordSchema } from 'src/schemas/keyword.schema';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({

  /* We bring the schemas and make it a Model to be used by our Controller and Service */
  imports: [MongooseModule.forFeature([
    {name: 'category', schema: categorySchema},
    {name: 'keyword', schema: keywordSchema}
  ])],

  /* Controller which will receive the initial request from client */
  controllers: [CategoryController],

  /* Service will have the logical business and the conection directly with MongoDB */
  providers: [CategoryService]
  
})

export class CategoryModule {}
