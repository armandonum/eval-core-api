// domain/entities/cognitive-evaluation.entity.ts
import { CognitiveEvaluationStatus } from '../enums/cognitive-evaluation-status.enum';

export class CognitiveEvaluation {
  constructor(
    public readonly cognitiveEvaluationId: string,
    public readonly projectId: string,
    public name: string,
    public description: string | null,
    public supervisorId: string,
    public status: CognitiveEvaluationStatus,
    public maxDurationMinutes: number,
    public targetUserDescription: string | null,
    public systemDescription: string | null,
    public startedAt: Date | null,
    public completedAt: Date | null,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  // Métodos de dominio
  start(): void {
    if (this.status === CognitiveEvaluationStatus.DRAFT || 
        this.status === CognitiveEvaluationStatus.PLANNING) {
      this.status = CognitiveEvaluationStatus.IN_PROGRESS;
      this.startedAt = new Date();
      this.updatedAt = new Date();
    } else {
      throw new Error('Cannot start evaluation in current status');
    }
  }

  complete(): void {
    if (this.status === CognitiveEvaluationStatus.IN_PROGRESS) {
      this.status = CognitiveEvaluationStatus.COMPLETED;
      this.completedAt = new Date();
      this.updatedAt = new Date();
    } else {
      throw new Error('Cannot complete evaluation in current status');
    }
  }

  archive(): void {
    if (this.status === CognitiveEvaluationStatus.COMPLETED) {
      this.status = CognitiveEvaluationStatus.ARCHIVED;
      this.updatedAt = new Date();
    } else {
      throw new Error('Cannot archive evaluation in current status');
    }
  }

  updateDetails(name: string, description: string | null): void {
    if (this.status !== CognitiveEvaluationStatus.DRAFT && 
        this.status !== CognitiveEvaluationStatus.PLANNING) {
      throw new Error('Cannot update evaluation details once started');
    }
    this.name = name;
    this.description = description;
    this.updatedAt = new Date();
  }

  updateConfiguration(
    maxDurationMinutes: number,
    targetUserDescription: string | null,
    systemDescription: string | null,
  ): void {
    if (this.status !== CognitiveEvaluationStatus.DRAFT && 
        this.status !== CognitiveEvaluationStatus.PLANNING) {
      throw new Error('Cannot update configuration once started');
    }
    this.maxDurationMinutes = maxDurationMinutes;
    this.targetUserDescription = targetUserDescription;
    this.systemDescription = systemDescription;
    this.updatedAt = new Date();
  }

  // Validación de negocio
  canAssignEvaluators(): boolean {
    return this.status === CognitiveEvaluationStatus.DRAFT || 
           this.status === CognitiveEvaluationStatus.PLANNING;
  }

  canAddTasks(): boolean {
    return this.status === CognitiveEvaluationStatus.DRAFT || 
           this.status === CognitiveEvaluationStatus.PLANNING;
  }
}