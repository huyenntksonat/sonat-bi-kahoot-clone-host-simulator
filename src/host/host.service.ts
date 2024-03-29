import { response } from 'express';
import { Injectable } from '@nestjs/common';
import { KahootService } from 'src/third-party/service/kahoot.service';
import { PlayersSimulator } from 'src/third-party/service/players-simulator.service';
import { PushQuestionDto } from 'src/third-party/dto/push-question.dto';
import { CURRENT_GAME_PIN, QS_ID } from 'src/constant/config.constant';

@Injectable()
export class HostService {
  constructor(
    private readonly kahootService: KahootService,
    private readonly playersSimulatorService: PlayersSimulator,
  ) { }

  async hello(name: string): Promise<string> {
    return await `Hello ${name}`;
  }

  async delay(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }

  async createGame(): Promise<any> {
    var response = await this.kahootService.createGame();
    const pin = response.data.pin;
    console.log(`Pin is `, pin);
    await this.delay(5000);
    var response2 = await this.playersSimulatorService.joinGame(pin);
    // console.log(`Response from players simulator: ${response2}`);

    return response;
  }

  async startGame(pin: string): Promise<any> {
    var response = await this.kahootService.startGame(pin);
    console.log(`Response of start game: `, response);
    await this.delay(5000);
    const pushQuestionDto = new PushQuestionDto({
      question: response.data.id,
      options: response.data.options,
    });
    return this.playersSimulatorService.pushQuestion(pin, pushQuestionDto);
  }

  startQuestion() {
    return this.playersSimulatorService.startQuestion(CURRENT_GAME_PIN, QS_ID)
  }

  nextQuestion() {
    return this.playersSimulatorService.nextQuestion(CURRENT_GAME_PIN, QS_ID)
  }


  closeQuestion() {
    return this.playersSimulatorService.closeQuestion(CURRENT_GAME_PIN, QS_ID)
  }

  getLeaderboard() {
    return this.playersSimulatorService.getLeaderboard(CURRENT_GAME_PIN)
  }
}
