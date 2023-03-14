import { categorieSchema } from 'src/schemas/categorie.schema';
import { CategorieController } from './categorie.controller';
import { CategorieService } from './categorie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
// Test
@Module({
  imports: [MongooseModule.forFeature([
    {name: 'categorie', schema: categorieSchema}
  ])],
  controllers: [CategorieController],
  providers: [CategorieService]
})
export class CategorieModule {}
