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
  QS_ID,
} from 'src/constant/config.constant';
import { SimulateGameDto } from './dto/simulate-game.dto';
import { CreateGameDto } from 'src/third-party/dto/create-game.dto';

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

  async simulate(dto: SimulateGameDto) {
    // ------------------------------------- Get kahoot -------------------------------------
    const getKahootResponse = await this.kahootService.getKahootbyId(
      dto.kahoot,
      dto.token,
    );
    // ------------------------------------- Create game -------------------------------------
    const createGameDto: CreateGameDto = new CreateGameDto({
      type: dto.type,
      kahoot: dto.kahoot,
      title: getKahootResponse.data.title,
      questions: getKahootResponse.data.questions.map((item) => item.id),
    });
    const createGameResponse = await this.kahootService.createGame(
      createGameDto,
      dto.token,
    );
    const pin = createGameResponse.data.pin;
    
    await this.delay(5000);
    // ------------------------------------- Join game -------------------------------------
    const joinGameResponse = await this.playersSimulatorService.joinGame(pin);
    await this.delay(5000);
    // ------------------------------------- Start game -------------------------------------
    const startGameResponse = await this.kahootService.startGame(pin);
    await this.simulatePlay(pin, getKahootResponse.data.questions);
  }

  async simulatePlay(pin: string, questions: any) {
    var currentQuestionNo = 0;
    while (currentQuestionNo < questions.length) {
      var currentQuestion = questions[currentQuestionNo];
      var startQuestionResponse = await this.kahootService.startQuestion(
        pin,
        currentQuestion.id,
      );
      await this.delay(5000);
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
      await this.delay(5000);
      var closeQuestionResponse = await this.kahootService.closeQuestion(
        pin,
        currentQuestion.id,
      );
      await this.delay(5000);
      var leaderboardResponse = await this.kahootService.getLeaderboard(pin);
      await this.delay(5000);
      if (currentQuestionNo == questions.length - 1) {
        break;
      }
      currentQuestionNo++;
      var nextQuestion = questions[currentQuestionNo];
      var nextQuestionId = nextQuestion._id;
      var nextQuestionResponse = await this.kahootService.nextQuestion(
        pin,
        nextQuestionId,
      );
      await this.delay(5000);
    }
    await this.delay(5000);
    var endGameResponse = await this.kahootService.endGame(pin);
    return endGameResponse.data;
  }

  async createGame(createGameDto: CreateGameDto, token: string): Promise<any> {
    var createGameResponse = await this.kahootService.createGame(
      createGameDto,
      token,
    );
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
