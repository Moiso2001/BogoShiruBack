import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { TagDto } from 'src/types/dto/tag.dto';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {

    constructor(private readonly TagService: TagService){}

    @Get()
    getAll(){
        return this.TagService.getAll()
    }

    @Get('id/:id')
    getTagById(@Param('id') id: string){
        return this.TagService.getTagById(id)
    }

    @Get('name/:name')
    getTagByName(@Param('name') name: string){
        return this.TagService.getTagByName(name)
    }

    @Post()
    createTag(@Body() newTag: TagDto){
        return this.TagService.createTag(newTag)
    }

    @Put(':id')
    updateTag(@Param('id') id: string, @Body() newTag: TagDto){
        return this.TagService.updateTag(id, newTag)
    }

    @Delete(':id')
    deleteTag(@Param('id') id: string){
        return this.TagService.deleteTag(id)
    }

}
