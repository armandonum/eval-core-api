// domain/entities/cognitive-evaluator.entity.ts
import { CognitiveEvaluatorRole } from '../enums/cognitive-evaluator-role.enum';

export class CognitiveEvaluator {
  constructor(
    public readonly id: string,
    public readonly evaluationId: string,
    public readonly userId: string,
    public evaluatorRole: CognitiveEvaluatorRole,
    public assignedAt: Date,
    public completedAt: Date | null,
    public notes: string | null,
  ) {}

  // Métodos de dominio
  complete(notes?: string): void {
    if (this.completedAt) {
      throw new Error('Evaluator already completed the evaluation');
    }
    this.completedAt = new Date();
    if (notes) {
      this.notes = notes;
    }
  }

  updateRole(role: CognitiveEvaluatorRole): void {
    this.evaluatorRole = role;
  }

  updateNotes(notes: string | null): void {
    this.notes = notes;
  }

  // Validaciones
  isSupervisor(): boolean {
    return this.evaluatorRole === CognitiveEvaluatorRole.SUPERVISOR;
  }

  isEvaluator(): boolean {
    return this.evaluatorRole === CognitiveEvaluatorRole.EVALUATOR;
  }

  isObserver(): boolean {
    return this.evaluatorRole === CognitiveEvaluatorRole.OBSERVER;
  }

  hasCompleted(): boolean {
    return this.completedAt !== null;
  }

  canStartEvaluation(): boolean {
    return !this.hasCompleted() && this.isEvaluator();
  }
}