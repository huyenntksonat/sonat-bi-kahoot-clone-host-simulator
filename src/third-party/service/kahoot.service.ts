import { Injectable } from '@nestjs/common';
import { BaseThirdPartyService } from './base-third-party.service';
import { BEARER_TOKEN, CREATE_GAME_DTO } from 'src/constant/config.constant';
import { CreateGameDto } from '../dto/create-game.dto';
import { KAHOOT_GAME_URL, KAHOOT_F8_BASE_URL } from '../constant/url.constant';

@Injectable()
export class KahootService extends BaseThirdPartyService {
  createGame(token: string): Promise<any> {
    var dto = new CreateGameDto(CREATE_GAME_DTO);

    return this.sendPost(
      `${KAHOOT_F8_BASE_URL}${KAHOOT_GAME_URL}`,
      dto,
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      true,
    );
  }

  startGame(pin: string): Promise<any> {
    var response = this.sendPost(
      `${KAHOOT_F8_BASE_URL}${KAHOOT_GAME_URL}/${pin}/start`,
      {},
      {},
      true,
    );
    // console.log(`Start game response: `, response);
    return response;
  }

  startQuestion(pin: string, questionId: string) {
    return this.sendPost(
      `${KAHOOT_F8_BASE_URL}/games/${pin}/startquestion/${questionId}`,
      {},
      {},
      true,
    );
  }

  nextQuestion(pin: string, questionId: string) {
    return this.sendPost(
      `${KAHOOT_F8_BASE_URL}/games/${pin}/nextquestion/${questionId}`,
      {},
      {},
      true,
    );
  }

  closeQuestion(pin: string, questionId: string) {
    return this.sendPost(
      `${KAHOOT_F8_BASE_URL}/games/${pin}/closequestion/${questionId}`,
      {},
      {},
      true,
    );
  }

  getLeaderboard(pin: string) {
    return this.sendGet(
      `${KAHOOT_F8_BASE_URL}/games/${pin}/leaderboard`,
      {},
      true
    );
  }

  endGame(pin: string) {
    return this.sendPost(
      `${KAHOOT_F8_BASE_URL}/games/${pin}/endgame`,
      {},
      {},
      true,
    );
  }
}
