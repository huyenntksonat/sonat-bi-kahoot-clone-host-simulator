import { Injectable } from '@nestjs/common';
import { BaseThirdPartyService } from './base-third-party.service';
import {
  BEARER_TOKEN,
  GAME_TITLE,
  GAME_TYPE,
  KAHOOT_ID,
  QUESTIONS,
} from 'src/constant/config.constant';
import { CreateGameDto } from '../dto/create-game.dto';
import { GAME_URL, KAHOOT_F8_BASE_URL } from '../constant/url.constant';

@Injectable()
export class KahootService extends BaseThirdPartyService {
  createGame(): Promise<any> {
    var dto = new CreateGameDto({
      type: GAME_TYPE,
      title: GAME_TITLE,
      questions: QUESTIONS,
      kahoot: KAHOOT_ID,
    });

    return this.sendPost(`${KAHOOT_F8_BASE_URL}${GAME_URL}`, dto, {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${BEARER_TOKEN}`,
    });
  }

  startGame(pin: string): Promise<any> {
    var response = this.sendPost(
      `${KAHOOT_F8_BASE_URL}${GAME_URL}/${pin}/start`,
      {},
    );
    // console.log(`Start game response: `, response);
    return response;
  }
}
