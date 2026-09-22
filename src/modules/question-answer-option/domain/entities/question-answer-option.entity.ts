export class QuestionAnswerOption {

  constructor(
    public answerId: string,
    public optionId: string,
  ) {}

  static create(params: {
    answerId: string;
    optionId: string;
  }) {
    return new QuestionAnswerOption(
      params.answerId,
      params.optionId,
    );
  }
}