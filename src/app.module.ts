import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HostModule } from './host/host.module';

@Module({
  imports: [HostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
