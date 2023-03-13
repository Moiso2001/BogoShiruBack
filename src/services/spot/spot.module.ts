import { Module } from '@nestjs/common';
import { SpotService } from './spot.service';
import { SpotController } from './spot.controller';

@Module({
  providers: [SpotService],
  controllers: [SpotController]
})
export class SpotModule {}
