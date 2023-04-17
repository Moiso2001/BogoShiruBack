import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { PlanDto, PlanRequestDto } from 'src/types/dto/plan.dto';
import { PlanService } from './plan.service';
import { Types } from 'mongoose';
import { Message, Plan } from 'src/types';

@Controller('plans')
export class PlanController {

    constructor(private readonly PlanService: PlanService){}

    @Get('request')
    planRequest(@Body() planRequest: PlanRequestDto): Promise <Plan[] | Message>{
        const querie: PlanRequestDto = {
            ...planRequest, 
            keyword: planRequest.keyword && planRequest.keyword.toLowerCase()
        }

        return this.PlanService.planRequest(querie)
    }

    @Get()
    getAll(): Promise<Plan[] | Message>{
        return this.PlanService.getAll()
    }

    @Get('id/:idSpot')
    getById(@Param('idSpot') idSpot: string): Promise<Plan | Message> {
        return this.PlanService.getById(idSpot)
    }

    @Get('name/:nameSpot')
    getByName(@Param('nameSpot') nameSpot: string): Promise<Plan | Message> {
        return this.PlanService.getByName(nameSpot)
    }

    @Post()
    createPlan(@Body() newPlan: PlanDto): Promise<Plan | Message> {
        return this.PlanService.createPlan(newPlan)
    }

    @Put(':id')
    updatePlan(@Param('id') idPlan: string, @Body() updatedPlan: PlanDto): Promise<Plan | Message> {
        return this.PlanService.updatePlan(idPlan, updatedPlan)
    }

    @Put('/spots/:idPlan')
    addSpotsToPlan(@Param('idPlan') idPlan: string, @Body() spots: Array<Types.ObjectId>) : Promise<Plan | Message> {
        return this.PlanService.addSpotsToPlan(idPlan, spots)
    }

    @Delete(':id')
    deletePlan(@Param('id') idPlan: string): Promise<Plan | Message> {
        return this.PlanService.deletePlan(idPlan)
    }
}
