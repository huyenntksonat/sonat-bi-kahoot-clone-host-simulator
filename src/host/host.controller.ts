import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HostService } from './host.service';
import { response } from 'express';

@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Post('simulate')
  simulateGame(@Body() requests) {
    this.hostService.simulate(requests.token);
  }

  @Post('create-game/')
  async createGame(@Body() request): Promise<any> {
    var res = await this.hostService.createGame(request.token);
    return res;
  }

  @Post('start-game/:pin')
  startGame(@Param('pin') pin: string): any {
    return this.hostService.startGame(pin);
  }

  @Post('start-question')
  startQuestion() {
    return this.hostService.startQuestion();
  }

  @Post('next-question/')
  nextQuestion() {
    return this.hostService.nextQuestion();
  }

  @Post('close-question')
  closeQuestion() {
    return this.hostService.closeQuestion();
  }

  @Get('leaderboard')
  getLeaderboard() {
    return this.hostService.getLeaderboard();
  }
}
