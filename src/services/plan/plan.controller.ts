import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
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
    createPlan(){}

    @Put()
    updatePlan(){}

    @Delete()
    deletePlan(){}
}
