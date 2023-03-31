import { CategoryDto } from 'src/types/dto/category.dto';
import { Category, Keyword, Message, Spot, Tag } from 'src/types';
import { SpotDto, SpotRequestDto } from 'src/types/dto/spot.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { TagDto } from 'src/types/dto/tag.dto';

@Injectable()
export class SpotService {

    constructor(
        @InjectModel('category') private readonly categoryModel: Model<Category>,
        @InjectModel('keyword') private readonly keywordModel: Model<Keyword>,
        @InjectModel('spot') private readonly spotModel: Model<Spot>,
        @InjectModel('tag') private readonly tagModel: Model<Tag>,
    ){};

    async spotRequest(spotRequest: SpotRequestDto){
        try {
            // We'll handle few cases, the first one when the user will type a spot name on the keyword input.
            const keywordIsSpotName: Spot | Spot[] = await this.spotModel.find({name: spotRequest.keyword, deletedAt: null}).exec();
            
            if(keywordIsSpotName.length > 0){
                return keywordIsSpotName
            }
        
            const keywordPassed = await this.keywordModel.findOne({name: spotRequest.keyword}).exec();

            if(!keywordPassed){
                return {message: `Keyword with name: ${spotRequest.keyword} not found`}
            }   

            const categoryRelatedKeyword = await this.categoryModel.find({keywords: {$in: [keywordPassed._id]}}).exec();
            // const spotsRelatedCategory = await this.spotModel.find({categories: {$in: []}})
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    }

    async getAll(): Promise<Message | Spot[]>{
        try {
            const spots = await this.spotModel.find();

            if(spots.length > 0){
                return spots
            }

            return {message: 'Spots not found'}
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };

    async getById(id: string): Promise<Message | Spot>{
        try {
            const spot = await this.spotModel.findById(id);

            if(!spot){
                return {message: `Spot with id: ${id} not found`}
            }

            return spot
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };

    async getByName(name: string): Promise<Message | Spot>{
        try {
            const spot = await this.spotModel.findOne({name});

            if(!spot){
                return {message: `Spot with name: ${name} not found`}
            }

            return spot
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };

    async createSpot(newSpot: SpotDto): Promise<Message>{
        try {
            // We validate if the spot name already exists on database
            const spotExist = await this.spotModel.findOne({name: newSpot.name});

            if(spotExist){
                return {message: `Spot with name: ${spotExist.name} already exist`}
            };

            const spot = new this.spotModel(newSpot);
            
            await spot.save()

            return {message: `Spot with name: ${spot.name} was created under id: ${spot._id}`}
        } catch (error) {
            return {message: 'An unexpected error appears', error};
        }
    };

    async updateSpot(id: string, newSpot: SpotDto): Promise<Message | Spot>{
        try {
            const updatedSpot = await this.spotModel.findByIdAndUpdate(id, newSpot, {new: true});

            if(!updatedSpot){
                return {message: `Spot with id: ${id} not found`}
            }

            return updatedSpot
        } catch (error) {
            return {message: 'An unexpected error appears', error};
        }
    };

    async deleteSpot(id: string): Promise<Message>{
        try {
            const deletedSpot = await this.spotModel.findByIdAndRemove(id)

            if (!deletedSpot) {
                return { message: `Spot with id: ${id} not found` };
            };
          
            return { message: `Spot with id: ${id} deleted successfully` };
        } catch (error) {
            return {message: 'An unexpected error appears', error};
        }
    };

    async addCategorySpot(spotId: string, categories: CategoryDto[]): Promise<Message | Spot>{
        try {
            const spotToUpdate = await this.spotModel.findById(spotId);

            // Validate if spotId exists
            if(!spotToUpdate){
                return{message: `Spot with ID ${spotId} not found.`}
            }

            // Map the KeywordDto array to an array of categories IDs
            const categoriesId: Array<Types.ObjectId> = [];

            for (const category of categories) { 
            
              // Search the category and if it does not exist we will create it
              const result = await this.categoryModel.findOne(
                { name: category.name.toLowerCase() }, // Case if the name already exists
                { new: true }
              );

              // In case some category does not exist
              if(!result){
                return {message: `Category with name: ${category.name.toLowerCase()} not found`}
              }

              // We validate if the category already exists in the spot to avoid adding duplicates or if the ObjectId reference is duplicated on the categories array
              if(spotToUpdate.categories.includes(result._id) || categoriesId.some(value => JSON.stringify(value) === JSON.stringify(result._id)))continue;

              categoriesId.push(result._id);
            }
        
            // Update the spot categories property with the new categories IDs
            spotToUpdate.categories = [...spotToUpdate.categories, ...categoriesId];
        
            // Save the updated spot into database
            await spotToUpdate.save();  
            
            return spotToUpdate
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };

    async addTagSpot(spotId: string, tags: TagDto[]): Promise<Message | Spot>{
        try {
            const spotToUpdate = await this.spotModel.findById(spotId);

            // Validate if spotId exists
            if(!spotToUpdate){
                return{message: `Spot with ID ${spotId} not found.`}
            }

            // Map the KeywordDto array to an array of tags IDs
            const tagsId: Array<Types.ObjectId> = [];

            for (const tag of tags) { 
            
              // Search the tag and if it does not exist we will create it
              const result = await this.tagModel.findOne(
                { name: tag.name.toLowerCase() }, // Case if the name already exists
                { new: true }
              );

              // In case some tag does not exist notify it
              if(!result){
                return {message: `Tag with name: ${tag.name.toLowerCase()} not found`}
              }

              // We validate if the tag already exists in the spot to avoid adding duplicates or if the ObjectId reference is duplicated on the tags array
              if(spotToUpdate.tags.includes(result._id) || tagsId.some(value => JSON.stringify(value) === JSON.stringify(result._id)))continue;

              tagsId.push(result._id);
            }
        
            // Update the spot tags property with the new tags IDs
            spotToUpdate.tags = [...spotToUpdate.tags, ...tagsId];
        
            // Save the updated spot into database
            await spotToUpdate.save();  
            
            return spotToUpdate
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };

    async deleteCategory(spotId: string, categoryName: string): Promise<Message | Spot>{
        try {
          // Search category by name and validate it in case the category name does not exist.
          const categoryToDelete = await this.categoryModel.findOne({name: categoryName});

          if(!categoryToDelete){
            return {message: `Category with name ${categoryName} not found.`};
          }

          // Search the category and pull the keyword provided before
          const spotToUpdate = await this.spotModel.findByIdAndUpdate(
            spotId,
            { $pull: { categories: categoryToDelete._id } }, // Pull method will pull out the category by id from our Spot.category array
            { new: true } // Will assure spotToUpdate will be the last category version
          );
      
          if (!spotToUpdate) {
            return {message: `Spot with ID ${spotId} not found.`};
          }
      
            return spotToUpdate;
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };

    async deleteTag(spotId: string, tagName: string): Promise<Message | Spot>{
        try {
          // Search tag by name and validate it in case the tag name does not exist.
          const tagToDelete = await this.tagModel.findOne({name: tagName});

          if(!tagToDelete){
            return {message: `Tag with name ${tagName} not found.`};
          }

          // Search the tag and pull the keyword provided before
          const spotToUpdate = await this.spotModel.findByIdAndUpdate(
            spotId,
            { $pull: { tags: tagToDelete._id } }, // Pull method will pull out the tag by id from our Spot.tag array
            { new: true } // Will assure spotToUpdate will be the last spot version
          );
      
          if (!spotToUpdate) {
            return {message: `Spot with ID ${spotId} not found.`};
          }
      
            return spotToUpdate;
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };
};

