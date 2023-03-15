import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Message, Tag } from 'src/types';
import { TagDto } from 'src/types/dto/tag.dto';


@Injectable()
export class TagService {

    constructor(@InjectModel('tag') private readonly tagModel: Model<Tag>){};

    /* We devided the services between type requests, initially the getAll which brings all tags in DB */
    async getAll(): Promise<Tag[] | Message>{
        try {
            const tags = await this.tagModel.find()

            if(tags.length > 0){
                return tags
            }

            return {message: 'There are no tags available on DB'}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    }

    /* Looking by ID */
    async getTagById(id: string): Promise<Tag | Message>{
        try {
            const tag = await this.tagModel.findById(id);

            console.log(tag)
            if(tag){
                return tag
            }

            return {message: `Tag with id ${id} not exists in DB`}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };

    /* Looking by name */
    async getTagByName(name: string): Promise<Tag | Message>{
        try {
            const tag = await this.tagModel.findOne({name});

            if(tag){
                return tag
            }

            return {message: `Tag with name ${name} not exists in DB`}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    }; 

    /* Used to post a Tag */
    async createTag (tag: TagDto): Promise<Message>{
        try {
            if(!tag.name){
                return {message: 'Name of tag is missing'}
            }

            const newTag = new this.tagModel(tag)
            await newTag.save()

            return {message: `Tag with name ${newTag.name} was created under id: ${newTag._id}`}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };

    /* Well... any further to say update and delete... just that :) */
    async updateTag(id: string, tag: TagDto): Promise<Tag | Message>{
        try {
            const updatedTag = await this.tagModel.findByIdAndUpdate(id, tag, {new: true})

            if(!updatedTag){
                return {message: `Tag under id: ${id} doesn't exist`}
            }
            
            return updatedTag
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };

    async deleteTag(id: string): Promise<Message>{
        try {
            const deletedTag = await this.tagModel.findByIdAndDelete(id).exec();

            if(!deletedTag){
                return {message: `The category under id: ${id} does not exist`}
            }

            return {message: `The tag under the id: ${deletedTag._id} was deleted correctly`}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    }
}
