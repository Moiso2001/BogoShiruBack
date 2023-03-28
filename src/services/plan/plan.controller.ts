import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';

@Controller('plans')
export class PlanController {

    @Get()
    getAll(){}

    @Get('id/:idSpot')
    getById(@Param('idSpot') idSpot: string){}

    @Get('name/:nameSpot')
    getByName(@Param('nameSpot') nameSpot: string){}

    @Post()
    createPlan(){}

    @Put()
    updatePlan(){}

    @Delete()
    deletePlan(){}
}
