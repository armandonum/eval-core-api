export type EvaluatorRole = 'supervisor' | 'evaluator' | 'observer';

export class HeuristicEvaluator {
  constructor(
    public readonly id: string,
    public evaluationId: string,
    public userId: string,
    public role: EvaluatorRole,
    public assignedAt: Date,
    public completedAt: Date | null,
    public notes: string | null,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(
    evaluationId: string,
    userId: string,
    role: EvaluatorRole = 'evaluator',
    notes: string | null = null,
  ): HeuristicEvaluator {
    return new HeuristicEvaluator(
      null as any,
      evaluationId,
      userId,
      role,
      new Date(),
      null,
      notes,
      new Date(),
      new Date(),
    );
  }

  update(role?: EvaluatorRole, notes?: string | null): void {
    if (role !== undefined) this.role = role;
    if (notes !== undefined) this.notes = notes;
    this.updatedAt = new Date();
  }

  markAsCompleted(): void {
    this.completedAt = new Date();
    this.updatedAt = new Date();
  }

  isCompleted(): boolean {
    return this.completedAt !== null;
  }
}