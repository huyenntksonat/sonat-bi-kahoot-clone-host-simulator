import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BaseThirdPartyService } from './base-thirdparty.service';
import { PlayerSimulatorService } from './players-simulator.service';

@Module({
  imports: [HttpModule],
  providers: [BaseThirdPartyService, PlayerSimulatorService],
  exports: [PlayerSimulatorService],
})
export class ThirdPartyModule {}
