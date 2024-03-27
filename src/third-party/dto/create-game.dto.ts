export class CreateGameDto {
  kahoot: string;

  type: string;

  startTime: Date;

  endTime: Date;

  randomize_answers: boolean;

  randomize_question: boolean;

  title: string;

  questions: string[];

  constructor(data?: Partial<CreateGameDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
