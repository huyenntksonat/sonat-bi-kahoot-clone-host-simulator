import {
  GAME_URL,
  JOIN_GAME_URL,
  PLAYERS_SIMULATOR_BASE_URL,
} from '../constant/url.constant';
import { PushQuestionDto } from '../dto/push-question.dto';
import { BaseThirdPartyService } from './base-third-party.service';

export class PlayersSimulator extends BaseThirdPartyService {
  joinGame(pin: string) {
    return this.sendGet(`${PLAYERS_SIMULATOR_BASE_URL}${JOIN_GAME_URL}/${pin}`);
  }

  pushQuestion(pin: string, dto: PushQuestionDto) {
    console.log(`Arriving at pushquestion at player simulator`);
    
    return this.sendPost(
      `${PLAYERS_SIMULATOR_BASE_URL}/players/${pin}/push-question`,
      dto,
    );
  }
}
