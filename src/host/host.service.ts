import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import {
  BEARER_TOKEN,
  GAME_TITLE,
  GAME_TYPE,
  KAHOOT_ID,
  QUESTIONS,
} from 'src/constant/config.constant';
import { CreateGameDto } from 'src/third-party/dto/create-game.dto';
import { BaseThirdPartyService } from 'src/third-party/service/base-third-party.service';
import { KahootService } from 'src/third-party/service/kahoot.service';
import {
  CREATE_GAME_URL,
  KAHOOT_F8_BASE_URL,
} from 'src/third-party/constant/url.constant';
import { PlayersSimulator } from 'src/third-party/service/players-simulator.service';

@Injectable()
export class HostService {
  constructor(
    private readonly kahootService: KahootService,
    private readonly playersSimulatorService: PlayersSimulator
  ) { }

  async hello(name: string): Promise<string> {
    return await `Hello ${name}`;
  }

  async delay(ms: number) {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
  }

  async createGame(): Promise<any> {
    var response = await this.kahootService.createGame();
    const pin = response.data.pin
    console.log(`Pin is `, pin);
    await this.delay(5000);

    // make requests to players app to join game
    var response2 = await this.playersSimulatorService.joinGame(pin);
    console.log(`Response from players simulator: ${response2}`);

    return pin;
  }
}
