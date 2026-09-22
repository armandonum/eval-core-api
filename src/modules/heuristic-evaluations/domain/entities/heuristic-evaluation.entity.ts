export type EvaluationStatus = 'draft' | 'planning' | 'in_progress' | 'completed' | 'archived';

export class HeuristicEvaluation {
  constructor(
    public readonly evaluationId: string,
    public projectId: string,
    public frameworkId: string,
    public supervisorId: string,
    public name: string,
    public description: string | null,
    public status: EvaluationStatus,
    public systemDescription: string | null,
    public targetUserDescription: string | null,
    public maxDurationMinutes: number,
    public startedAt: Date | null,
    public completedAt: Date | null,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(
    projectId: string,
    frameworkId: string,
    supervisorId: string,
    name: string,
    description: string | null,
    systemDescription: string | null,
    targetUserDescription: string | null,
    maxDurationMinutes: number = 20,
  ): HeuristicEvaluation {
    return new HeuristicEvaluation(
      null as any,
      projectId,
      frameworkId,
      supervisorId,
      name,
      description,
      'draft',
      systemDescription,
      targetUserDescription,
      maxDurationMinutes,
      null,
      null,
      new Date(),
      new Date(),
    );
  }

  update(
    name?: string,
    description?: string | null,
    systemDescription?: string | null,
    targetUserDescription?: string | null,
    maxDurationMinutes?: number,
  ): void {
    if (name !== undefined) this.name = name;
    if (description !== undefined) this.description = description;
    if (systemDescription !== undefined) this.systemDescription = systemDescription;
    if (targetUserDescription !== undefined) this.targetUserDescription = targetUserDescription;
    if (maxDurationMinutes !== undefined) this.maxDurationMinutes = maxDurationMinutes;
    this.updatedAt = new Date();
  }

  changeStatus(newStatus: EvaluationStatus): void {
    this.status = newStatus;
    if (newStatus === 'in_progress' && !this.startedAt) {
      this.startedAt = new Date();
    }
    if (newStatus === 'completed') {
      this.completedAt = new Date();
    }
    this.updatedAt = new Date();
  }
}