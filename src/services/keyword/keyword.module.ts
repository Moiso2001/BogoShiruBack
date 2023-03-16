import { Module } from '@nestjs/common';
import { KeywordController } from './keyword.controller';
import { KeywordService } from './keyword.service';
import { MongooseModule } from '@nestjs/mongoose';
import { keywordSchema } from 'src/schemas/keyword.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'keyword', schema: keywordSchema}])],
  controllers: [KeywordController],
  providers: [KeywordService]
})
export class KeywordModule {}
