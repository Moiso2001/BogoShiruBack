import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { KeywordDto } from 'src/types/dto/keyword.dto';


@Controller('keyword')
export class KeywordController {

    @Get()
    getAll(){

    }

    @Get('id/:id')
    getKeywordById(@Param('id') id: string){

    }

    @Get('name/:name')
    getKeywordByName(@Param('name') name: string){

    }

    @Post()
    createKeyword(@Body() newKeyword: KeywordDto){

    }

    @Put(':id')
    updateKeyword(@Param() id: string, @Body() keyword: KeywordDto){

    }

    @Delete(':id')
    deleteKeyword(@Param('id') id:string){

    }
}
