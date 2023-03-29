import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { PlanDto } from 'src/types/dto/plan.dto';
import { PlanService } from './plan.service';

@Controller('plans')
export class PlanController {

    constructor(private readonly PlanService: PlanService){}

    @Get()
    getAll(){
        return this.PlanService.getAll()
    }

    @Get('id/:idSpot')
    getById(@Param('idSpot') idSpot: string){
        return this.PlanService.getById(idSpot);
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

    @Delete(':id')
    deletePlan(@Param('id') idPlan: string){
        return this.PlanService.deletePlan(idPlan)
    }
}
