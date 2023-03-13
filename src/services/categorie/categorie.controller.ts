import { Controller, Get, Post, Put, Delete, Body, Param} from '@nestjs/common';


@Controller('categorie')
export class CategorieController {

    @Get()
    getCategories(){
        
    }

    @Get(':id')
    getCategorie(@Param('id') id: string){
        
    }

    @Post()
    postCategorie(){

    }

    @Put()
    modifyCategorie(){

    }

    @Delete()
    deleteCategorie(){

    }

}

