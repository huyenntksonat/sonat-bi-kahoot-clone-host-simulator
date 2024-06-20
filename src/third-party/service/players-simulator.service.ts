import {
  PS_JOIN_GAME_URL,
  PLAYERS_SIMULATOR_BASE_URL,
} from '../constant/url.constant';
import { PushQuestionDto } from '../dto/push-question.dto';
import { BaseThirdPartyService } from './base-third-party.service';

export class PlayersSimulator extends BaseThirdPartyService {
  async joinGame(pin: string) {
    return await this.sendGet(`${PLAYERS_SIMULATOR_BASE_URL}${PS_JOIN_GAME_URL}/${pin}`);
  }

  pushQuestion(pin: string, dto: PushQuestionDto) {
    return this.sendPost(
      `${PLAYERS_SIMULATOR_BASE_URL}/players/${pin}/push-question`,
      dto,
    );
  }
}
