import {
  KAHOOT_GAME_URL,
  PS_JOIN_GAME_URL,
  PLAYERS_SIMULATOR_BASE_URL,
  KAHOOT_F8_BASE_URL,
} from '../constant/url.constant';
import { PushQuestionDto } from '../dto/push-question.dto';
import { BaseThirdPartyService } from './base-third-party.service';

export class PlayersSimulator extends BaseThirdPartyService {
  joinGame(pin: string) {
    return this.sendGet(`${PLAYERS_SIMULATOR_BASE_URL}${PS_JOIN_GAME_URL}/${pin}`);
  }

  pushQuestion(pin: string, dto: PushQuestionDto) {
    console.log(`Arriving at pushquestion at player simulator`);

    return this.sendPost(
      `${PLAYERS_SIMULATOR_BASE_URL}/players/${pin}/push-question`,
      dto,
    );
  }

  startQuestion(pin: string, questionId: string) {
    return this.sendPost(
      `${KAHOOT_F8_BASE_URL}/games/${pin}/startquestion/${questionId}`,
      {}
    );
  }

  nextQuestion(pin: string, questionId: string) {
    return this.sendPost(
      `${KAHOOT_F8_BASE_URL}/games/${pin}/nextquestion/${questionId}`,
      {}
    );

  }

  closeQuestion(pin: string, questionId: string) {
    return this.sendPost(
      `${KAHOOT_F8_BASE_URL}/games/${pin}/closequestion/${questionId}`,
      {}
    );

  }

  getLeaderboard(pin: string) {
    return this.sendGet(
      `${KAHOOT_F8_BASE_URL}/games/${pin}/leaderboard`,
      {}
    );

  }
}
