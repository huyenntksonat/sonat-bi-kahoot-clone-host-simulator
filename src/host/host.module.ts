import { Module } from '@nestjs/common';
import { HostController } from './host.controller';
import { HostService } from './host.service';
import { HttpModule } from '@nestjs/axios';
import { ThirdPartyModule } from 'src/third-party/service/thirdparty.module';

@Module({
  imports: [HttpModule, ThirdPartyModule],
  controllers: [HostController],
  providers: [HostService],
})
export class HostModule {}
