import { JOIN_GAME_URL, PLAYERS_SIMULATOR_BASE_URL } from "../constant/url.constant";
import { BaseThirdPartyService } from "./base-third-party.service";

export class PlayersSimulator extends BaseThirdPartyService {

    joinGame(pin: string) {
        return this.sendGet(
            `${PLAYERS_SIMULATOR_BASE_URL}${JOIN_GAME_URL}/${pin}`
        );
    }
}