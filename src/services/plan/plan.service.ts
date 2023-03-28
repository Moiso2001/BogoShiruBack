import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Plan, Spot } from 'src/types/index';
import { Model } from 'mongoose';

@Injectable()
export class PlanService {

    constructor(
        @InjectModel('plan') private readonly planModel: Model<Plan>,
        @InjectModel('spot') private readonly spotModel: Model<Spot>
    ){};

    async getAll(){
        try {
            const plans = await this.planModel.find();

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
            const plan = await this.planModel.findById(idPlan)

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
            const plan = await this.planModel.findOne({name: namePlan});

            if(!plan){
                return {message: `Plan with name: ${namePlan} not found`}
            }

            return plan
        } catch (error) {
            return {message: 'An unexpected error ocurred on DB', error};
        }
    }
    
}
