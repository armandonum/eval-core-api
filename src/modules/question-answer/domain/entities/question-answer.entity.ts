export class QuestionAnswer {
  constructor(
    public readonly answerId: string,

    public responseId: string,

    public questionId: string,

    public answerText: string | null,

    public selectedOptionId: string | null,

    public scaleValue: number | null,

    public booleanValue: boolean | null,

    public isNotApplicable: boolean,

    public createdAt: Date,
  ) {}

  static create(params: {
    answerId: string
    responseId: string
    questionId: string
    answerText?: string | null
    selectedOptionId?: string | null
    scaleValue?: number | null
    booleanValue?: boolean | null
    isNotApplicable?: boolean
    createdAt?: Date
  }) {
    return new QuestionAnswer(
      params.answerId,
      params.responseId,
      params.questionId,
      params.answerText ?? null,
      params.selectedOptionId ?? null,
      params.scaleValue ?? null,
      params.booleanValue ?? null,
      params.isNotApplicable ?? false,
      params.createdAt ?? new Date(),
    )
  }

  update(data: {
    answerText?: string | null
    selectedOptionId?: string | null
    scaleValue?: number | null
    booleanValue?: boolean | null
    isNotApplicable?: boolean
  }) {
    if (data.answerText !== undefined)
      this.answerText = data.answerText

    if (data.selectedOptionId !== undefined)
      this.selectedOptionId = data.selectedOptionId

    if (data.scaleValue !== undefined)
      this.scaleValue = data.scaleValue

    if (data.booleanValue !== undefined)
      this.booleanValue = data.booleanValue

    if (data.isNotApplicable !== undefined)
      this.isNotApplicable = data.isNotApplicable
  }
}