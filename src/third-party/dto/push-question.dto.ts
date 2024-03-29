export class PushQuestionDto {
  question: string;

  options: QuestionOption[];

  constructor(data?: Partial<PushQuestionDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

export class QuestionOption {
  description: string;

  TorF: boolean;

  id: string;

  constructor(data?: Partial<QuestionOption>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
