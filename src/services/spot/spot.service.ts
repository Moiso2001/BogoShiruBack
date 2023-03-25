import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category, Message, Spot } from 'src/types';
import { CategoryDto } from 'src/types/dto/category.dto';
import { SpotDto } from 'src/types/dto/spot.dto';

@Injectable()
export class SpotService {

    constructor(
        @InjectModel('spot') private readonly spotModel: Model<Spot>,
        @InjectModel('category') private readonly categoryModel: Model<Category>
        ){};

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

    async getById(id: string){
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

    async getByName(name: string){
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

    async createSpot(newSpot: SpotDto){
        try {
            const spot = new this.spotModel(newSpot);
            
            await spot.save()

            return {message: `Spot with name: ${spot.name} was created under id: ${spot._id}`}
        } catch (error) {
            return {message: 'An unexpected error appears', error};
        }
    };

    async updateSpot(id: string, newSpot: SpotDto){
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

    async deleteSpot(id: string){
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

    async addCategorySpot(spotId: string, categories: CategoryDto[]){
        try {
            const spotToUpdate = await this.spotModel.findById(spotId);

            // Validate if spotId exists
            if(!spotToUpdate){
                return{message: `Spot with ID ${spotId} not found.`}
            }

            // Map the KeywordDto array to an ab rray of keyword IDs
            const categoriesId: Array<Types.ObjectId> = [];

            for (const category of categories) { 
            
              // Search the category and if it does not exist we will create it
              const result = await this.categoryModel.findOne(
                { name: category.name.toLowerCase() }, // Case if the name already exists
                { new: true }
              );

              // In case some category does not exist we don't want to cut all the thread, just notify it at console and continue with the next element
              if(!result){
                return {message: `Category with name: ${category.name.toLowerCase()} not found`}
              }

              // We validate if the category already exists in the spot to avoid adding duplicates or if the ObjectId reference is duplicated on the categories array
              if(spotToUpdate.categories.includes(result._id) || categoriesId.some(value => JSON.stringify(value) === JSON.stringify(result._id)))continue;

              categoriesId.push(result._id);
            }
        
            // Update the spot categories property with the new keyword IDs
            spotToUpdate.categories = [...spotToUpdate.categories, ...categoriesId];
        
            // Save the updated spot into database
            await spotToUpdate.save();  
            
            return spotToUpdate
        } catch (error) {
            return {message: 'An unexpected error appears', error}
        }
    };
};