export class TextSentiment {
  constructor(
    public readonly sentimentId: string,
    public sessionId: string | null,
    public text: string,
    public originalLabel: string,
    public uxLabel: string,
    public confidence: number,
    public scoresJson: Record<string, any>,
    public elapsedMsTotal: number,
    public timestampReal: Date,
    public createdAt: Date,
    public updatedAt: Date,
    public authorId: string | null,
  ) {}

  update(
    data: Partial<
      Omit<
        TextSentiment,
        'sentimentId' | 'createdAt'
      >
    >,
  ): void {
    if (data.sessionId !== undefined) {
      this.sessionId = data.sessionId;
    }

    if (data.text !== undefined) {
      this.text = data.text;
    }

    if (data.originalLabel !== undefined) {
      this.originalLabel = data.originalLabel;
    }

    if (data.uxLabel !== undefined) {
      this.uxLabel = data.uxLabel;
    }

    if (data.confidence !== undefined) {
      this.confidence = data.confidence;
    }

    if (data.scoresJson !== undefined) {
      this.scoresJson = data.scoresJson;
    }

    if (data.elapsedMsTotal !== undefined) {
      this.elapsedMsTotal = data.elapsedMsTotal;
    }

    if (data.timestampReal !== undefined) {
      this.timestampReal = data.timestampReal;
    }

    if (data.authorId !== undefined) {
      this.authorId = data.authorId;
    }

    this.updatedAt = new Date();
  }
}