export class HeuristicPositiveAspect {
  constructor(
    public readonly aspectId: string,
    public sessionId: string,
    public evaluationId: string,
    public evaluatorId: string,
    public taskId: string | null,
    public description: string,
    public readonly createdAt: Date,
  ) {}

  static create(
    sessionId: string,
    evaluationId: string,
    evaluatorId: string,
    taskId: string | null,
    description: string,
  ): HeuristicPositiveAspect {
    return new HeuristicPositiveAspect(
      null as any,
      sessionId,
      evaluationId,
      evaluatorId,
      taskId,
      description,
      new Date(),
    );
  }

  update(description: string): void {
    this.description = description;
  }
}