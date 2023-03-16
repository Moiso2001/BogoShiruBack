import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { SpotDto } from 'src/types/dto/spot.dto';

@Controller('spots')
export class SpotController {

    @Get()
    getAll(){

    }

    @Get('id/:id')
    getSpotById(@Param('id') id: string){

    }

    @Get('name/:name')
    getSpotByName(@Param('name') name: string){

    }

    @Post()
    createPost(@Body() newSpot: SpotDto){

    }

    @Put(':id')
    updateSpot(@Param() id: string, @Body() updatedSpot: SpotDto){
        
    }
}
