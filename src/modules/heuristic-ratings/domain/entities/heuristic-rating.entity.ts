export class HeuristicRating {
  constructor(
    public readonly ratingId: string,
    public evaluationId: string,
    public sessionId: string,
    public evaluatorId: string,
    public problemId: string, // observation_id
    public severity: number, // 1-5
    public frequency: number, // 1-10
    public readonly criticality: number, // severity + frequency (calculado)
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(
    evaluationId: string,
    sessionId: string,
    evaluatorId: string,
    problemId: string,
    severity: number,
    frequency: number,
  ): HeuristicRating {
    if (severity < 1 || severity > 5) {
      throw new Error('La severidad debe estar entre 1 y 5');
    }
    if (frequency < 1 || frequency > 10) {
      throw new Error('La frecuencia debe estar entre 1 y 10');
    }

    return new HeuristicRating(
      null as any,
      evaluationId,
      sessionId,
      evaluatorId,
      problemId,
      severity,
      frequency,
      severity + frequency, // Criticality
      new Date(),
      new Date(),
    );
  }

  update(severity?: number, frequency?: number): void {
    if (severity !== undefined) {
      if (severity < 1 || severity > 5) {
        throw new Error('La severidad debe estar entre 1 y 5');
      }
      this.severity = severity;
    }
    if (frequency !== undefined) {
      if (frequency < 1 || frequency > 10) {
        throw new Error('La frecuencia debe estar entre 1 y 10');
      }
      this.frequency = frequency;
    }
    this.updatedAt = new Date();
  }

  getCriticality(): number {
    return this.severity + this.frequency;
  }
}