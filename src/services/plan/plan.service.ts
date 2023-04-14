import { Injectable, NotFoundException } from '@nestjs/common';
import { Keyword, Message, Plan, Spot } from 'src/types/index';
import { SpotRequestDto } from 'src/types/dto/spot.dto';
import { PlanDto } from 'src/types/dto/plan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import escapeRegExp from "regexp.escape";

type Query = {
    name: { $regex: RegExp }
    location?: string
    cost?: number
}

@Injectable()
export class PlanService {

    constructor(
        @InjectModel('keyword') private readonly keywordModel: Model<Keyword>,
        @InjectModel('plan') private readonly planModel: Model<Plan>,
        @InjectModel('spot') private readonly spotModel: Model<Spot>
    ){};

    async planRequest({keyword, budget, location}: SpotRequestDto): Promise<Plan[] | Message>{
        try {
            //Validate if keyword is provided
            if(!keyword){
                return {message: "Keyword is missing"}
            }

            // Looking if there is some plan related with the keyword.
            const keywordIsPlan: Plan[] = await this.planModel.find({name: keyword}).exec();

            if(keywordIsPlan.length > 0){
                return keywordIsPlan
            };

            // If we confirm that the keyword is not directly the plan, we will search that the keyword exists
            const keywordExisted = await this.keywordModel.findOne({name: keyword, deletedAt: null}).exec();

            if(!keywordExisted){
                throw new NotFoundException(`Keyword with name ${keyword} not found`);
            }

            // We will search the plans by name, this will be a search by matching charecters on the name, ej: {name: 'chorro de quevedo'}, keyword: 'quevedo', this will match with the obj
            // First we'll create a query to be used on our .find() method, this will have a regex to use it on the query, we pass it through escapeRegExp to avoid and clean "special characters"
            const query: Query = {
                name: { $regex: new RegExp(escapeRegExp(keyword), 'i')}
            }

            // In case the user specify location we'll add it into the query 
            if(location){
                query.location = location
            }

            // In case the user specify budget we'll add it into our query
            if(budget){
                query.cost = budget
            }

            // Now we'll search the plans by the following regex created using the keyword provided by the user
            const plansByKeyword = await this.planModel.find(query).exec();

            //Check if there is no coincidences searching by the keyword
            if(plansByKeyword.length === 0){
                return {message: `There are no plans matching with the keyword: ${keyword}`}
            }

            return plansByKeyword
        } catch (error) {
            return {message: 'An unexpected error ocurred on DB', error}
        }
    }

    async getAll(){
        try {
            const plans = await this.planModel.find({deletedAt: null}).exec();// Excluding soft deleted documents

            if(plans.length === 0){
                return {message: `Plans not found`}
            }

            return plans  
        } catch (error) {
            return {message: 'An unexpected error ocurred on DB', error}
        }
    };

    async getById(idPlan: string){
        try {
            const plan = await this.planModel
                .findById(idPlan)
                .where('deletedAt').equals(null) // Exclude soft deleted plans
                .exec()

            if(!plan){
                return {message: `Plan with id: ${idPlan} not found`}
            }

            return plan
        } catch (error) {
            return {message: 'An unexpected error ocurred on DB', error}
        }
    }

    async getByName(namePlan: string){
        try {
            const plan = await this.planModel.findOne({name: namePlan, deletedAt: null}).exec(); // Excluding soft deleted documents

            if(!plan){
                return {message: `Plan with name: ${namePlan} not found`}
            }

            return plan
        } catch (error) {
            return {message: 'An unexpected error ocurred on DB', error};
        }
    }

    async createPlan(newPlan: PlanDto){
        try {
            const planExisted = await this.planModel.findOne({name: newPlan.name, deletedAt: null}).exec(); // Excluding soft deleted documents

            if(planExisted){
                return {message: `Plan with name: ${newPlan.name} already existed under id: ${planExisted._id}`}
            }

            const planCreated = new this.planModel(newPlan);

            await planCreated.save();

            return planCreated
        } catch (error) {
            return {message: 'An unexpected error ocurred on DB', error};
        }
    }

    async updatePlan(idPlan: string, newPlan: PlanDto){
        try {
            const updatedPlan = await this.planModel.findByIdAndUpdate(
                idPlan, 
                newPlan, 
                {new: true, runValidators: true})
                .where({deletedAt: null}) // Excluding soft deleted documents
                .exec(); 

            if(!updatedPlan){
                return {message: `Plan under id: ${idPlan} not found`}
            }

            return updatedPlan
        } catch (error) {
            return {message: 'An unexpected error ocurred on DB', error};
        }
    }

    async deletePlan(idPlan){
        try {
            //Soft delete implemented to avoid DB error queries on future
            const deletedPlan = await this.planModel
                .findById(idPlan,{ new: true })
                .where({deletedAt: null})
                .exec();

            if(!deletedPlan){
                return {message: `Plan under id: ${idPlan} not found`}
            }

            deletedPlan.deletedAt = new Date();
            await deletedPlan.save();

            return deletedPlan
        } catch (error) {
            return {message: 'An unexpected error ocurred on DB', error};
        }
    };
}
