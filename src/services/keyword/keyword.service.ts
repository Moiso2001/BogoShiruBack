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
            const keywords = await this.keywordModel.find({deletedAt: null}).exec()

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
            const keyword = await this.keywordModel
                .findById(id)
                .where('deletedAt').equals(null) // Exclude soft deleted plans
                .exec();

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
            const keyword = await this.keywordModel
                .findOne({name})
                .where('deletedAt').equals(null) // Exclude soft deleted plans
                .exec();

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
            const keywordExists = await this.keywordModel.findOne(keyword)

            if(keywordExists){
                return {message: `Keyword already existed under id: ${keywordExists._id}`}
            }
            
            const newKeyword = new this.keywordModel(keyword)
            await newKeyword.save()

            return {message: `Keyword with name ${newKeyword.name} was created under id: ${newKeyword._id}`}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };

    /* Well... any further to say update and delete... just that :) */
    async updateKeywords(id: string, newKeyword: KeywordDto): Promise<Keyword | Message>{
        try {
            const updatedKeyword = await this.keywordModel.findByIdAndUpdate(
                id, 
                newKeyword, 
                {new: true, runValidators: true})
                .where({deletedAt: null}) // Excluding soft deleted documents
                .exec();
            
            if(!updatedKeyword){
                return {message: `Keyword under id: ${id} doesn't exist`}
            }
            
            return updatedKeyword
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };

    async deleteKeyword(id: string): Promise<Message | Keyword>{
        try {
            //Soft delete implemented to avoid DB error queries on future
            const deletedKeyword = await this.keywordModel.findByIdAndUpdate(
                id,
                { deletedAt: new Date() },
                { new: true }
                )

            if(!deletedKeyword){
                return {message: `Plan under id: ${id} not found`}
            }

            return deletedKeyword
        } catch (error) {
            return {message: 'An unexpected error ocurred on DB', error};
        }
    }
}
