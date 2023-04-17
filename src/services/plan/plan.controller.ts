import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { PlanDto, PlanRequestDto } from 'src/types/dto/plan.dto';
import { PlanService } from './plan.service';
import { Types } from 'mongoose';

@Controller('plans')
export class PlanController {

    constructor(private readonly PlanService: PlanService){}

    @Get('request')
    planRequest(@Body() planRequest: PlanRequestDto){
        const querie: PlanRequestDto = {
            ...planRequest, 
            keyword: planRequest.keyword && planRequest.keyword.toLowerCase()
        }

        return this.PlanService.planRequest(querie)
    }

    @Get()
    getAll(){
        return this.PlanService.getAll()
    }

    @Get('id/:idSpot')
    getById(@Param('idSpot') idSpot: string){
        return this.PlanService.getById(idSpot)
    }

    @Get('name/:nameSpot')
    getByName(@Param('nameSpot') nameSpot: string){
        return this.PlanService.getByName(nameSpot)
    }

    @Post()
    createPlan(@Body() newPlan: PlanDto){
        return this.PlanService.createPlan(newPlan)
    }

    @Put(':id')
    updatePlan(@Param('id') idPlan: string, @Body() updatedPlan: PlanDto){
        return this.PlanService.updatePlan(idPlan, updatedPlan)
    }

    @Put('/spots/:idPlan')
    addSpotsToPlan(@Param('idPlan') idPlan: string, @Body() spots: Array<Types.ObjectId>){
        return this.PlanService.addSpotsToPlan(idPlan, spots)
    }

    @Delete(':id')
    deletePlan(@Param('id') idPlan: string){
        return this.PlanService.deletePlan(idPlan)
    }
}
