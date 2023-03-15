import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { CategoryDto } from 'src/types/dto/category.dto';
import { CategoryService } from './category.service';
import { Category, Message } from 'src/types';


@Controller('categorie')
export class CategoryController {

    constructor(private readonly CategoryService: CategoryService){}

    /* We divided between type of request, initially the Get, this will bring all categories */
    @Get()
    getCategories(): Promise<Category[] | Message>{
        return this.CategoryService.getAll()
    }

    /* Searching just by ID */
    @Get('id/:id')
    getCategoryById(@Param('id') id: string): Promise<Category | Message>{
        return this.CategoryService.getCategoryById(id)
    };

    /* Searching just by Name */
    @Get('name/:name')
    getCategoryByName(@Param('name') name: string): Promise<Category | Message>{
        return this.CategoryService.getCategoryByName(name)
    };

    /* Create a new categorie, receive it by Body */
    @Post()
    createCategory(@Body() newCategorie: CategoryDto): Promise<Message>{
        return this.CategoryService.createCategory(newCategorie)
    };

    /* Put request, must receive an ID by Param and the categorie by Body, this categorie means the property to be updated with his value */
    @Put(':id')
    modifyCategory(@Param('id') id: string, @Body() categorie: CategoryDto): Promise<Category | Message>{
        return this.CategoryService.updateCategory(id, categorie);
    }

    /* To delete a category is necessary just the ID any other parameter will throw an error*/
    @Delete(':id')
    deleteCategory(@Param('id') id: string): Promise<Message>{
        return this.CategoryService.deleteCategory(id)
    }
}
