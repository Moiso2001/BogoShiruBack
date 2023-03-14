import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { Categorie, errorMessage } from 'src/types';
import { CategorieService } from './categorie.service';

@Controller('categorie')
export class CategorieController {

    constructor(private readonly categorieService: CategorieService){}

    @Get()
    getCategories(): Promise<Categorie[] | errorMessage>{
        return this.categorieService.getAll()
    }

    @Get('id/:id')
    getCategorieById(@Param('id') id: String){
        return this.categorieService.getCategorieById(id)
    }

    @Get('name/:name')
    getCategorieByName(@Param('name') name: String){
        return this.categorieService.getCategorieByName(name)
    }
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
