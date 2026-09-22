// domain/entities/cognitive-task.entity.ts
import { CognitiveTaskStatus } from '../enums/cognitive-task-status.enum';

export class CognitiveTask {
  constructor(
    public readonly id: string,
    public readonly evaluationId: string,
    public projectTaskId: string | null,
    public title: string,
    public description: string | null,
    public userGoal: string | null,
    public orderIndex: number,
    public status: CognitiveTaskStatus,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  // Métodos de dominio
  start(): void {
    if (this.status === CognitiveTaskStatus.PENDING) {
      this.status = CognitiveTaskStatus.IN_PROGRESS;
      this.updatedAt = new Date();
    } else {
      throw new Error('Cannot start a task that is not pending');
    }
  }

  complete(): void {
    if (this.status === CognitiveTaskStatus.IN_PROGRESS) {
      this.status = CognitiveTaskStatus.COMPLETED;
      this.updatedAt = new Date();
    } else {
      throw new Error('Cannot complete a task that is not in progress');
    }
  }

  fail(): void {
    if (this.status === CognitiveTaskStatus.IN_PROGRESS || 
        this.status === CognitiveTaskStatus.PENDING) {
      this.status = CognitiveTaskStatus.FAILED;
      this.updatedAt = new Date();
    } else {
      throw new Error('Cannot fail a task that is already completed');
    }
  }

  updateDetails(title: string, description: string | null, userGoal: string | null): void {
    if (this.status === CognitiveTaskStatus.COMPLETED) {
      throw new Error('Cannot update a completed task');
    }
    this.title = title;
    this.description = description;
    this.userGoal = userGoal;
    this.updatedAt = new Date();
  }

  updateOrder(orderIndex: number): void {
    this.orderIndex = orderIndex;
    this.updatedAt = new Date();
  }

  // Validaciones
  canAddActions(): boolean {
    return this.status !== CognitiveTaskStatus.COMPLETED;
  }

  isPending(): boolean {
    return this.status === CognitiveTaskStatus.PENDING;
  }

  isCompleted(): boolean {
    return this.status === CognitiveTaskStatus.COMPLETED;
  }

  getProgress(): number {
    // Este método puede ser enriquecido con la cantidad de acciones completadas
    return this.status === CognitiveTaskStatus.COMPLETED ? 100 : 0;
  }
}