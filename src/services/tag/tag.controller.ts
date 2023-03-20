import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { Message, Tag } from 'src/types';
import { KeywordDto } from 'src/types/dto/keyword.dto';
import { TagDto } from 'src/types/dto/tag.dto';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {

    constructor(private readonly TagService: TagService){}

    /* We divided between type of request, initially the Get, this will bring all tags */
    @Get()
    getAll(): Promise<Tag[] | Message>{
        return this.TagService.getAll()
    };

    /* Searching just by ID */
    @Get('id/:id')
    getTagById(@Param('id') id: string): Promise<Tag | Message>{
        return this.TagService.getTagById(id)
    };

    /* Searching just by Name */
    @Get('name/:name')
    getTagByName(@Param('name') name: string): Promise<Tag | Message>{
        return this.TagService.getTagByName(name)
    };

    /* Create a new tag, receive it by Body */
    @Post()
    createTag(@Body() newTag: TagDto): Promise<Message>{
        return this.TagService.createTag(newTag)
    };

    /* Put request, must receive an ID by Param and the tag by Body, this tag has the property to be updated with his value */
    @Put(':id')
    updateTag(@Param('id') id: string, @Body() newTag: TagDto): Promise<Tag | Message>{
        return this.TagService.updateTag(id, newTag)
    };

    /* Put to update the category with keywords passed by array of keyword object */
    @Put('keywords/:idTag')
    addKeyword(@Param('idTag') id: string, @Body() keywords: KeywordDto[]){
        return this.TagService.addKeywords(id, keywords)
    };

    /* To delete a tag is necessary just the ID any other parameter will throw an error*/
    @Delete(':id')
    deleteTag(@Param('id') id: string): Promise<Message>{
        return this.TagService.deleteTag(id)
    };

    /* Delete keyword on a category, this will ask for the category id and the name of the keyword */
    @Delete('keywords/:idTag/:keywordName')
    deleteKeywordOnCategory(@Param('idTag') idTag: string, @Param('keywordName') keyword: string): Promise<Message | Tag>{
        return this.TagService.deleteKeyword(idTag, keyword)
    };
}
