import { Injectable, NotFoundException } from '@nestjs/common';
import { Keyword, Message, Plan, Spot } from 'src/types/index';
import { SpotRequestDto } from 'src/types/dto/spot.dto';
import { PlanDto, PlanRequestDto } from 'src/types/dto/plan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

type Query = {
    name: { $regex: RegExp }
    location?: string
    cost?: number
    deletedAt: null
};

@Injectable()
export class PlanService {

    constructor(
        @InjectModel('plan') private readonly planModel: Model<Plan>,
        @InjectModel('spot') private readonly spotModel: Model<Spot>
    ){};

    async planRequest({keyword, budget, location}: PlanRequestDto): Promise<Plan[] | Message>{
        try {
            //Validate if keyword is provided
            if(!keyword){
                return {message: "Keyword is missing"}
            }

            // We will search the plans by name, this will be a search by matching charecters on the name, ej: {name: 'chorro de quevedo'}, keyword: 'quevedo', this will match with the obj
            // First we'll create a query to be used on our .find() method, this will have a regex to use it on the query, we pass it through escapeRegExp to avoid and clean "special characters"
            const query: Query = {
                name: { $regex: new RegExp(keyword, 'i')},
                deletedAt: null
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
                return {message: `Plans not found related with the request: ${keyword} - location: ${location ? location : 'All location'} - cost: ${ budget ?  budget : 'No budget'}`}
            }

            return plansByKeyword
        } catch (error) {
            return {message: 'An unexpected error ocurred on DB', error}
        }
    };

    async getAll(): Promise<Plan[] | Message>{
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

    async getById(idPlan: string): Promise<Plan | Message> {
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
    };

    async getByName(namePlan: string): Promise<Plan | Message> {
        try {
            const plan = await this.planModel.findOne({name: namePlan, deletedAt: null}).exec(); // Excluding soft deleted documents

            if(!plan){
                return {message: `Plan with name: ${namePlan} not found`}
            }

            return plan
        } catch (error) {
            return {message: 'An unexpected error ocurred on DB', error};
        }
    };

    async createPlan(newPlan: PlanDto): Promise<Plan | Message> {
        try {
            const planExisted = await this.planModel.findOne({name: newPlan.name, deletedAt: null}).exec(); // Excluding soft deleted documents

            if(planExisted){
                return {message: `Plan with name: ${newPlan.name} already existed under id: ${planExisted._id}`}
            }
            
            // To lowercase to normalize each plan propeties created to be in lower case
            const planCreated = new this.planModel({
                ...newPlan, 
                name: newPlan.name.toLowerCase(),
                location: newPlan.location.toLowerCase()
            });

            await planCreated.save();

            return planCreated
        } catch (error) {
            return {message: 'An unexpected error ocurred on DB', error};
        }
    };

    async updatePlan(idPlan: string, newPlan: PlanDto): Promise<Plan | Message> {
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
    };

    async addSpotsToPlan(idPlan: string, spots: Array<Types.ObjectId>) : Promise<Plan | Message> {
        try {
            //We search the plan by id to be sure first that the plan exists
            const planToUpdate = await this.planModel
                .findById(idPlan)
                .where({deletedAt: null})
                .exec();

            // Thrown an error message in case plan does not exist
            if(!planToUpdate){
                return {message: `Plan under id: ${idPlan} not found`}
            }

            // Future array to be added on the plan as spot id's
            const spotsId: Array<Types.ObjectId> = [];

            for (const spot of spots) {
                //First we'll check if the spot by the id exists
                const spotExisted = await this.spotModel
                    .findById(spot, {new: true})
                    .where({deletedAt: null})
                    .exec();
                
                // Thrown an error message if the spot does not exists
                if(!spotExisted){
                    return {message: `Spot with id: ${spot} not found`}
                }

                
                // In case the spot already exists on the spotsId array or on the spots on the plan, we'll jump into the next spot
                if(planToUpdate.spots.includes(spot) || spotsId.some(value => JSON.stringify(value) === JSON.stringify(spot))) continue;

                // Finally if the spot exists and is not already on the plan, we push the id into our spotsId array
                spotsId.push(spot);
            }

            // We add the new array with ids into the spots property on the plan
            planToUpdate.spots = [...planToUpdate.spots, ...spotsId];

            // Finally we save the plan updated with the new ids.
            await planToUpdate.save()

            return planToUpdate
        } catch (error) {
            return {message: 'An unexpected error ocurred on DB', error};
        }
    }

    async deletePlan(idPlan): Promise<Plan | Message> {
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
