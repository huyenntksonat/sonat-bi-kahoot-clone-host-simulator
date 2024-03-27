import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BaseThirdPartyService } from './base-third-party.service';
import { KahootService } from './kahoot.service';
import { PlayersSimulator } from './players-simulator.service';

@Module({
  imports: [HttpModule],
  providers: [BaseThirdPartyService, KahootService, PlayersSimulator],
  exports: [BaseThirdPartyService, KahootService, PlayersSimulator],
})
export class ThirdPartyModule { }
