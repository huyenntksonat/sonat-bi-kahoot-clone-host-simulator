import { Controller, Get, Param } from '@nestjs/common';
import { HostService } from './host.service';

@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Get('create-game/')
  async createGame(): Promise<any> {
    return await this.hostService.createGame();
  }
}
