import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { CategoryDto, KeywordDto } from 'src/types/dto/index.dto';
import { CategoryService } from './category.service';
import { Category, Message } from 'src/types';


@Controller('categories')
export class CategoryController {

    constructor(private readonly CategoryService: CategoryService){}

    /* We divided between type of request, initially the Get, this will bring all categories */
    @Get()
    getCategories(): Promise<Category[] | Message>{
        return this.CategoryService.getAll()
    };

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
        return this.CategoryService.createCategory({...newCategorie, name: newCategorie.name.toLowerCase()})
    };

    /* Put request, must receive an ID by Param and the categorie by Body, this categorie has the property to be updated with his value */
    @Put(':id')
    modifyCategory(@Param('id') id: string, @Body() categorie: CategoryDto): Promise<Category | Message>{
        return this.CategoryService.updateCategory(id, categorie);
    };

    /* Put to update the category with keywords passed by array of keyword object */
    @Put('keywords/:id')
    addKeyword(@Param('id') idCategory: string, @Body() keywords: KeywordDto[]): Promise<Category | Message> {
        return this.CategoryService.addKeywords(idCategory, keywords);
    };

    /* To delete a category is necessary just the ID any other parameter will throw an error*/
    @Delete(':id')
    deleteCategory(@Param('id') id: string): Promise<Message | Category>{
        return this.CategoryService.deleteCategory(id)
    };

    /* Delete keyword on a category, this will ask for the category id and the name of the keyword */
    @Delete('keywords/:idCategory/:keywordName')
    deleteKeywordOnCategory(@Param('idCategory') idCategory: string, @Param('keywordName') keyword: string): Promise <Message | Category>{
        return this.CategoryService.deleteKeyword(idCategory, keyword.toLowerCase())
    };
}
