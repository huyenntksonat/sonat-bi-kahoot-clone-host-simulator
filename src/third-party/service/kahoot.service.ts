import { Injectable } from '@nestjs/common';
import { BaseThirdPartyService } from './base-third-party.service';
import {
  BEARER_TOKEN,
  CREATE_GAME_DTO,
} from 'src/constant/config.constant';
import { CreateGameDto } from '../dto/create-game.dto';
import { KAHOOT_GAME_URL, KAHOOT_F8_BASE_URL } from '../constant/url.constant';

@Injectable()
export class KahootService extends BaseThirdPartyService {
  createGame(): Promise<any> {
    var dto = new CreateGameDto(CREATE_GAME_DTO);

    return this.sendPost(`${KAHOOT_F8_BASE_URL}${KAHOOT_GAME_URL}`, dto, {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${BEARER_TOKEN}`,
    });
  }

  startGame(pin: string): Promise<any> {
    var response = this.sendPost(
      `${KAHOOT_F8_BASE_URL}${KAHOOT_GAME_URL}/${pin}/start`,
      {},
    );
    // console.log(`Start game response: `, response);
    return response;
  }
}
