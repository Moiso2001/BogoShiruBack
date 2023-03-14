import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { Categorie } from 'src/types';

@Controller('categorie')
export class CategorieController {

    @Get()
    getCategories(){

    }

    @Get(':id')
    getCategorie(@Param('id') id: String){}

    @Post()
    createCategorie(@Body() newCategorie: Categorie){

    }

    @Put(':id')
    modifyCategorie(@Param('id') id: String, @Body() categorie: Categorie){

    }

    @Delete(':id')
    deleteCategorie(@Param('id') id: String){
        
    }
}
