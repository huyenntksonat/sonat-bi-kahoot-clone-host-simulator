export class PushQuestionDto {
  question: string;

  options: Option[];

  constructor(data?: Partial<PushQuestionDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

export class Option {
  description: string;

  TorF: boolean;

  id: string;

  constructor(data?: Partial<Option>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
