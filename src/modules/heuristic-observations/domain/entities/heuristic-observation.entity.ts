export type ObservationFrequency =
  | 'Siempre'
  | 'Frecuentemente'
  | 'Ocasionalmente'
  | 'Raramente'
  | 'Nunca';

export class HeuristicObservation {
  constructor(
    public readonly observationId: string,
    public sessionId: string,
    public evaluationId: string,
    public evaluatorId: string,
    public taskId: string | null,
    public principleId: string,
    public description: string,
    public severity: number, // 1-5
    public frequency: ObservationFrequency,
    public recommendation: string | null,
    public nodeId: string | null,
    public screenIdentifier: string | null,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(
    sessionId: string,
    evaluationId: string,
    evaluatorId: string,
    taskId: string | null,
    principleId: string,
    description: string,
    severity: number,
    frequency: ObservationFrequency,
    recommendation: string | null,
    nodeId: string | null,
    screenIdentifier: string | null,
  ): HeuristicObservation {
    if (severity < 1 || severity > 5) {
      throw new Error('La severidad debe estar entre 1 y 5');
    }

    return new HeuristicObservation(
      null as any,
      sessionId,
      evaluationId,
      evaluatorId,
      taskId,
      principleId,
      description,
      severity,
      frequency,
      recommendation,
      nodeId,
      screenIdentifier,
      new Date(),
      new Date(),
    );
  }

  update(
    description?: string,
    severity?: number,
    frequency?: ObservationFrequency,
    recommendation?: string | null,
    nodeId?: string | null,
    screenIdentifier?: string | null,
  ): void {
    if (description !== undefined) this.description = description;
    if (severity !== undefined) {
      if (severity < 1 || severity > 5) {
        throw new Error('La severidad debe estar entre 1 y 5');
      }
      this.severity = severity;
    }
    if (frequency !== undefined) this.frequency = frequency;
    if (recommendation !== undefined) this.recommendation = recommendation;
    if (nodeId !== undefined) this.nodeId = nodeId;
    if (screenIdentifier !== undefined) this.screenIdentifier = screenIdentifier;
    this.updatedAt = new Date();
  }
}