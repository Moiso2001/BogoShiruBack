import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category, Message } from 'src/types';
import { CategoryDto } from 'src/types/dto/category.dto';


@Controller('categorie')
export class CategoryController {

    constructor(private readonly CategoryService: CategoryService){}

    @Get()
    getCategories(): Promise<Category[] | Message>{
        return this.CategoryService.getAll()
    }

    @Get('id/:id')
    getCategorieById(@Param('id') id: string): Promise<Category | Message>{
        return this.CategoryService.getCategoryById(id)
    };

    @Get('name/:name')
    getCategorieByName(@Param('name') name: string): Promise<Category | Message>{
        return this.CategoryService.getCategoryByName(name)
    };

    @Post()
    createCategorie(@Body() newCategorie: CategoryDto): Promise<Message>{
        return this.CategoryService.createCategory(newCategorie)
    };

    @Put(':id')
    modifyCategorie(@Param('id') id: string, @Body() categorie: CategoryDto){

    }

    @Delete(':id')
    deleteCategorie(@Param('id') id: string){

    }
}
