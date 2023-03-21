import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { SpotDto } from 'src/types/dto/spot.dto';
import { SpotService } from './spot.service';

@Controller('spots')
export class SpotController {

    constructor(private readonly SpotService: SpotService){}

    @Get()
    getAll(){
        return this.SpotService.getAll()
    }

    @Get('id/:id')
    getSpotById(@Param('id') id: string){
        return this.SpotService.getById(id)
    }

    @Get('name/:name')
    getSpotByName(@Param('name') name: string){
        return this.SpotService
    }

    @Post()
    createPost(@Body() newSpot: SpotDto){

    }

    @Put(':id')
    updateSpot(@Param() id: string, @Body() updatedSpot: SpotDto){
        
    }
}
