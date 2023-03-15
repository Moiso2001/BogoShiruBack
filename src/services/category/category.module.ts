import { categorySchema } from 'src/schemas/category.schema';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'category', schema: categorySchema}
  ])],
  controllers: [CategoryController],
  providers: [CategoryService]
})

export class CategoryModule {}
