import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { KeywordDto } from 'src/types/dto/keyword.dto';
import { KeywordService } from './keyword.service';


@Controller('keywords')
export class KeywordController {

    constructor(private readonly KeywordService: KeywordService){};

    @Get()
    getAll(){
        return this.KeywordService.getAll()
    };

    @Get('id/:id')
    getKeywordById(@Param('id') id: string){
        return this.KeywordService.getKeywordById(id)
    };

    @Get('name/:name')
    getKeywordByName(@Param('name') name: string){
        return this.KeywordService.getKeywordByName(name)
    };

    @Post()
    createKeyword(@Body() newKeyword: KeywordDto){
        return this.KeywordService.createKeyword(newKeyword)
    };

    @Put(':id')
    updateKeyword(@Param('id') id: string, @Body() keyword: KeywordDto){
        return this.KeywordService.updateKeywords(id, keyword)
    };

    @Delete(':id')
    deleteKeyword(@Param('id') id:string){
        return this.KeywordService.deleteKeyword(id)
    };
}
