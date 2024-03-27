import { Controller, Get, Param } from '@nestjs/common';
import { HostService } from './host.service';

@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Get('create-game/:name')
  async createGame(@Param('name') name: string): Promise<String> {
    return await this.hostService.hello(name);
  }
}
