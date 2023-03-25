import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { CategoryDto } from 'src/types/dto/category.dto';
import { SpotDto } from 'src/types/dto/spot.dto';
import { TagDto } from 'src/types/dto/tag.dto';
import { SpotService } from './spot.service';

@Controller('spots')
export class SpotController {

    constructor(private readonly SpotService: SpotService){}

    @Get()
    getAll(){
        return this.SpotService.getAll()
    }

    @Get('id/:id')
    getSpotById(@Param('id') id: string){
        return this.SpotService.getById(id)
    }

    @Get('name/:name')
    getSpotByName(@Param('name') name: string){
        return this.SpotService.getByName(name)
    }

    @Post()
    createPost(@Body() newSpot: SpotDto){
        return this.SpotService.createSpot(newSpot)
    }

    @Put(':id')
    updateSpot(@Param('id') id: string, @Body() updatedSpot: SpotDto){
        return this.SpotService.updateSpot(id, updatedSpot)
    }

    @Put('categories/:idSpot')
    addCategorySpot(@Param('idSpot') idSpot: string, @Body() categories: CategoryDto[]){
        return this.SpotService.addCategorySpot(idSpot, categories)
    }

    @Put('tags/:idSpot')
    addTagSpot(@Param('idSpot') idSpot: string, @Body() tags: TagDto[]){
        return this.SpotService.addTagSpot(idSpot, tags)
    }

    @Delete(':id')
    deleteSpot(@Param('id') id: string){
        return this.SpotService.deleteSpot(id)
    }

    @Delete('categories/:idSpot/:categoryName')
    deleteCategory(@Param('idSpot') idSpot: string, @Param('categoryName') categoryName: string){
        return this.SpotService.deleteCategory(idSpot, categoryName.toLowerCase())
    }

    @Delete('tags/:idSpot/:tagName')
    deleteTag(@Param('idSpot') idSpot: string, @Param('tagName') tagName: string){
        return this.SpotService.deleteTag(idSpot, tagName.toLowerCase())
    }
}
