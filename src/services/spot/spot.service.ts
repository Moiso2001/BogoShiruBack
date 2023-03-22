import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message, Spot } from 'src/types';
import { SpotDto } from 'src/types/dto/spot.dto';

@Injectable()
export class SpotService {

    constructor(@InjectModel('spot') private readonly spotModel: Model<Spot>){};

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
};