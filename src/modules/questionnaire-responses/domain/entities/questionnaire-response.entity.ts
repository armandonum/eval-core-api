export class QuestionnaireResponse {

  constructor(
    public readonly responseId: string,
    public questionnaireId: string,
    public participantId: string,
    public sessionId: string | null,
    public submittedAt: Date,
  ) {}

  static create(params: {
    responseId: string;
    questionnaireId: string;
    participantId: string;
    sessionId?: string | null;
    submittedAt?: Date;
  }): QuestionnaireResponse {

    return new QuestionnaireResponse(
      params.responseId,
      params.questionnaireId,
      params.participantId,
      params.sessionId ?? null,
      params.submittedAt ?? new Date(),
    );
  }

  update(data: {
    sessionId?: string | null;
  }) {

    if (data.sessionId !== undefined) {
      this.sessionId = data.sessionId;
    }
  }
}