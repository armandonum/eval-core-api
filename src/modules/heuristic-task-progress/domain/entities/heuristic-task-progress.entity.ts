export type TaskProgressStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

export class HeuristicTaskProgress {
  constructor(
    public readonly progressId: string,
    public evaluatorId: string,
    public taskId: string,
    public evaluationId: string,
    public sessionId: string | null,
    public status: TaskProgressStatus,
    public startedAt: Date | null,
    public completedAt: Date | null,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(
    evaluatorId: string,
    taskId: string,
    evaluationId: string,
    sessionId: string | null = null,
    status: TaskProgressStatus = 'pending',
  ): HeuristicTaskProgress {
    const now = new Date();
    return new HeuristicTaskProgress(
      null as any,
      evaluatorId,
      taskId,
      evaluationId,
      sessionId,
      status,
      status === 'in_progress' ? now : null,
      status === 'completed' ? now : null,
      now,
      now,
    );
  }

  changeStatus(newStatus: TaskProgressStatus, sessionId?: string): void {
    const now = new Date();

    // Validar transiciones válidas
    const validTransitions: Record<TaskProgressStatus, TaskProgressStatus[]> = {
      pending: ['in_progress', 'completed', 'failed'],
      in_progress: ['completed', 'failed', 'pending'],
      completed: ['in_progress'], // Permitir reabrir si es necesario
      failed: ['in_progress', 'pending'],
    };

    if (!validTransitions[this.status].includes(newStatus)) {
      throw new Error(
        `No se puede cambiar de "${this.status}" a "${newStatus}"`,
      );
    }

    this.status = newStatus;
    this.updatedAt = now;

    if (newStatus === 'in_progress' && !this.startedAt) {
      this.startedAt = now;
    }

    if (newStatus === 'completed') {
      this.completedAt = now;
    }

    if (sessionId !== undefined) {
      this.sessionId = sessionId;
    }
  }

  isCompleted(): boolean {
    return this.status === 'completed';
  }
}