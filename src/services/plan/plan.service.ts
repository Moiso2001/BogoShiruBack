import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Plan, Spot } from 'src/types/index';
import { Model } from 'mongoose';

@Injectable()
export class PlanService {

    constructor(
        @InjectModel('plan') private readonly planModel: Model<Plan>,
        @InjectModel('spot') private readonly spotModel: Model<Spot>
        ){}
}
