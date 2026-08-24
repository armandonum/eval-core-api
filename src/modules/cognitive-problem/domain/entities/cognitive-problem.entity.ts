// domain/entities/cognitive-problem.entity.ts
import { CognitiveProblemSeverity } from '../enums/cognitive-problem-severity.enum';
import { CognitiveProblemCategory } from '../enums/cognitive-problem-category.enum';
import { CognitiveProblemStatus } from '../enums/cognitive-problem-status.enum';

export class CognitiveProblem {
  constructor(
    public readonly id: string,
    public readonly evaluationId: string,
    public title: string,
    public description: string,
    public severity: CognitiveProblemSeverity,
    public category: CognitiveProblemCategory | null,
    public reportedBy: string | null,
    public affectedTasks: string[],
    public status: CognitiveProblemStatus,
    public resolutionNotes: string | null,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  // Métodos de dominio
  updateDetails(title: string, description: string): void {
    this.title = title;
    this.description = description;
    this.updatedAt = new Date();
  }

  updateSeverity(severity: CognitiveProblemSeverity): void {
    this.severity = severity;
    this.updatedAt = new Date();
  }

  updateCategory(category: CognitiveProblemCategory | null): void {
    this.category = category;
    this.updatedAt = new Date();
  }

  addAffectedTask(taskId: string): void {
    if (!this.affectedTasks.includes(taskId)) {
      this.affectedTasks.push(taskId);
      this.updatedAt = new Date();
    }
  }

  removeAffectedTask(taskId: string): void {
    this.affectedTasks = this.affectedTasks.filter(id => id !== taskId);
    this.updatedAt = new Date();
  }

  startAnalysis(): void {
    if (this.status === CognitiveProblemStatus.IDENTIFIED) {
      this.status = CognitiveProblemStatus.ANALYZING;
      this.updatedAt = new Date();
    } else {
      throw new Error('Only identified problems can be moved to analyzing');
    }
  }

  resolve(notes: string): void {
    if (this.status === CognitiveProblemStatus.ANALYZING || 
        this.status === CognitiveProblemStatus.IDENTIFIED) {
      this.status = CognitiveProblemStatus.RESOLVED;
      this.resolutionNotes = notes;
      this.updatedAt = new Date();
    } else {
      throw new Error('Only analyzing or identified problems can be resolved');
    }
  }

  reject(reason: string): void {
    if (this.status === CognitiveProblemStatus.IDENTIFIED || 
        this.status === CognitiveProblemStatus.ANALYZING) {
      this.status = CognitiveProblemStatus.REJECTED;
      this.resolutionNotes = reason;
      this.updatedAt = new Date();
    } else {
      throw new Error('Only identified or analyzing problems can be rejected');
    }
  }

  // Validaciones y utilidades
  isCritical(): boolean {
    return this.severity === CognitiveProblemSeverity.CRITICAL;
  }

  isHighPriority(): boolean {
    return this.severity === CognitiveProblemSeverity.CRITICAL || 
           this.severity === CognitiveProblemSeverity.HIGH;
  }

  isResolved(): boolean {
    return this.status === CognitiveProblemStatus.RESOLVED;
  }

  isRejected(): boolean {
    return this.status === CognitiveProblemStatus.REJECTED;
  }

  isActive(): boolean {
    return this.status === CognitiveProblemStatus.IDENTIFIED || 
           this.status === CognitiveProblemStatus.ANALYZING;
  }

  getSeverityScore(): number {
    const scores = {
      [CognitiveProblemSeverity.CRITICAL]: 5,
      [CognitiveProblemSeverity.HIGH]: 4,
      [CognitiveProblemSeverity.MEDIUM]: 3,
      [CognitiveProblemSeverity.LOW]: 1,
    };
    return scores[this.severity] || 0;
  }
}