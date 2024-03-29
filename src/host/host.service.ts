import { response } from 'express';
import { Injectable } from '@nestjs/common';
import { KahootService } from 'src/third-party/service/kahoot.service';
import { PlayersSimulator } from 'src/third-party/service/players-simulator.service';
import {
  PushQuestionDto,
  QuestionOption,
} from 'src/third-party/dto/push-question.dto';
import {
  CURRENT_GAME_PIN,
  CURRENT_QUESTION,
  QS_ID,
  QUESTION_LIST,
} from 'src/constant/config.constant';

@Injectable()
export class HostService {
  constructor(
    private readonly kahootService: KahootService,
    private readonly playersSimulatorService: PlayersSimulator,
  ) {}

  async hello(name: string): Promise<string> {
    return await `Hello ${name}`;
  }

  async delay(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }

  async simulate(token: string) {
    // ------------------------------------- Create game -------------------------------------
    var createGameResponse = await this.kahootService.createGame(token);
    const pin = createGameResponse.data.pin;
    // console.log(`Pin is `, pin);
    await this.delay(5000);
    // ------------------------------------- Join game -------------------------------------
    var joinGameResponse = await this.playersSimulatorService.joinGame(pin);
    // console.log(`Response from players simulator: ${response2}`);
    await this.delay(5000);
    // ------------------------------------- Start game -------------------------------------
    var startGameResponse = await this.kahootService.startGame(pin);
    await this.simulatePlay(pin);
  }

  async simulatePlay(pin: string) {
    var currentQuestionNo = 0;
    while (currentQuestionNo < QUESTION_LIST.length) {
      var currentQuestion = QUESTION_LIST[currentQuestionNo];
      var startQuestionResponse = await this.kahootService.startQuestion(
        pin,
        currentQuestion.id,
      );
      // await this.delay(5000);
      var pushQuestionDto = new PushQuestionDto({
        question: currentQuestion.id,
        options: currentQuestion.options.map(
          (item) =>
            new QuestionOption({
              description: item.description,
              TorF: item.TorF,
              id: item._id,
            }),
        ),
      });
      var pushQuestionResponse =
        await this.playersSimulatorService.pushQuestion(pin, pushQuestionDto);
      // await this.delay(5000);
      var closeQuestionResponse = await this.kahootService.closeQuestion(
        pin,
        currentQuestion.id,
      );
      // await this.delay(5000);
      var leaderboardResponse = await this.kahootService.getLeaderboard(pin);
      // await this.delay(5000);
      if (currentQuestionNo == QUESTION_LIST.length - 1) {
        break;
      }
      currentQuestionNo++;
      var nextQuestion = QUESTION_LIST[currentQuestionNo];
      var nextQuestionId = nextQuestion._id;
      var nextQuestionResponse = await this.kahootService.nextQuestion(
        pin,
        nextQuestionId,
      );
      // await this.delay(5000);
    }
    var endGameResponse = this.kahootService.endGame(pin);
  }

  async createGame(token: string): Promise<any> {
    var createGameResponse = await this.kahootService.createGame(token);
    const pin = createGameResponse.data.pin;
    return createGameResponse;
  }

  async startGame(pin: string): Promise<any> {
    var response = await this.kahootService.startGame(pin);
    // console.log(`Response of start game: `, response);
    await this.delay(5000);
    const pushQuestionDto = new PushQuestionDto({
      question: response.data.id,
      options: response.data.options,
    });
    return this.playersSimulatorService.pushQuestion(pin, pushQuestionDto);
  }

  startQuestion() {
    return this.kahootService.startQuestion(CURRENT_GAME_PIN, QS_ID);
  }

  nextQuestion() {
    return this.kahootService.nextQuestion(CURRENT_GAME_PIN, QS_ID);
  }

  closeQuestion() {
    return this.kahootService.closeQuestion(CURRENT_GAME_PIN, QS_ID);
  }

  getLeaderboard() {
    return this.kahootService.getLeaderboard(CURRENT_GAME_PIN);
  }
}
