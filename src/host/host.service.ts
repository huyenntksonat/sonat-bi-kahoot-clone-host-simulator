import { Injectable } from '@nestjs/common';
import {
  BEARER_TOKEN,
  GAME_TITLE,
  GAME_TYPE,
  KAHOOT_ID,
  QUESTIONS,
} from 'src/constant/config.constant';
import { CreateGameDto } from 'src/third-party/dto/create-game.dto';
import { PlayerSimulatorService } from 'src/third-party/service/players-simulator.service';
import {
  CREATE_GAME_URL,
  KAHOOT_F8_BASE_URL,
} from 'src/third-party/url.constant';

@Injectable()
export class HostService {
  constructor(private readonly playerSimulator: PlayerSimulatorService) {}

  async hello(name: string): Promise<string> {
    return await `Hello ${name}`;
  }

  async createGame() {
    var dto = new CreateGameDto();
    dto.type = GAME_TYPE;
    dto.title = GAME_TITLE;
    dto.questions = QUESTIONS;
    dto.kahoot = KAHOOT_ID;
    return this.playerSimulator.sendPost(
      KAHOOT_F8_BASE_URL + CREATE_GAME_URL,
      dto,
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    );
  }
}
