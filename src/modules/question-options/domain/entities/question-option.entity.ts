export class QuestionOption {

  constructor(
    public readonly optionId: string,
    public questionId: string,
    public label: string,
    public orderIndex: number,
  ) {}

  static create(params: {
    optionId: string;
    questionId: string;
    label: string;
    orderIndex: number;
  }): QuestionOption {

    return new QuestionOption(
      params.optionId,
      params.questionId,
      params.label,
      params.orderIndex,
    );
  }

  update(data: {
    label?: string;
    orderIndex?: number;
  }) {

    if (data.label !== undefined) {
      this.label = data.label;
    }

    if (data.orderIndex !== undefined) {
      this.orderIndex = data.orderIndex;
    }
  }
}