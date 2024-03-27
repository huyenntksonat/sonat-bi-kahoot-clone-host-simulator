import { Module } from '@nestjs/common';
import { HostController } from './host.controller';
import { HostService } from './host.service';
import { PlayerSimulatorService } from 'src/third-party/service/players-simulator.service';
import { ThirdPartyModule } from 'src/third-party/service/thirdparty.module';

@Module({
  imports: [ThirdPartyModule],
  controllers: [HostController],
  providers: [HostService],
})
export class HostModule {}
