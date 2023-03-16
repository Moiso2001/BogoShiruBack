import { KeywordDto } from 'src/types/dto/keyword.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Keyword, Message } from 'src/types';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class KeywordService {

    constructor(@InjectModel('keyword') private readonly keywordModel: Model<Keyword>){}

    /* We devided the services between type requests, initially the getAll which brings all keywords in DB */
    async getAll(): Promise<Keyword[] | Message> {
        try {
            const keywords = await this.keywordModel.find()

            if(keywords.length > 0){
                return keywords
            }

            return {message: 'There are no keywords available'}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };
    
    /* Looking by ID */
    async getKeywordById(id: string): Promise<Keyword | Message>{
        try {
            const keyword = await this.keywordModel.findById(id);

            if(keyword){
                return keyword
            }

            return {message: `Keyword with id ${id} not exists in DB`}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };

    /* Looking by name */
    async getKeywordByName(name: string): Promise<Keyword | Message>{
        try {
            const keyword = await this.keywordModel.findOne({name});

            if(keyword){
                return keyword
            }

            return {message: `Keyword with name ${name} not exists in our DB`}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };

    /* Used to post a keyword */
    async createKeyword(keyword: KeywordDto): Promise<Message>{
        try {
            if(!keyword.name){
                return {message: 'Name of keyword is missing'}
            }

            const newKeyword = new this.keywordModel(keyword)
            await newKeyword.save()

            return {message: `Category with name ${keyword.name} was created under id: ${newKeyword._id}`}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };

    /* Well... any further to say update and delete... just that :) */
    async updateKeywords(id: string, keyword: KeywordDto): Promise<Keyword | Message>{
        try {
            console.log(id)
            const updatedKeyword = await this.keywordModel.findByIdAndUpdate(id, keyword, {new: true})
            
            if(!updatedKeyword){
                return {message: `Keyword under id: ${id} doesn't exist`}
            }
            
            return updatedKeyword
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };

    async deleteKeyword(id: string): Promise<Message>{
        try {
            const deletedKeyword = await this.keywordModel.findByIdAndDelete(id).exec();

            if(!deletedKeyword){
                return {message: `The keyword under id: ${id} does not exist`}
            }

            return {message: `The category under the id: ${deletedKeyword._id} was deleted correctly`}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    }
}
