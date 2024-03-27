import { Controller, Get, Param } from '@nestjs/common';
import { HostService } from './host.service';
import { response } from 'express';

@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) { }

  @Get('create-game/')
  async createGame(): Promise<any> {
    var res = await this.hostService.createGame();
    return res;
  }
}
