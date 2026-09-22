// domain/entities/finding.entity.ts
import { FindingType } from '../enums/finding-type.enum';
import { FindingSeverity } from '../enums/finding-severity.enum';
import { FindingImpact } from '../enums/finding-impact.enum';
import { FindingPriority } from '../enums/finding-priority.enum';
import { FindingStatus } from '../enums/finding-status.enum';

export class Finding {
  constructor(
    public readonly findingId: string,
    public evaluationId: string,
    public sessionId: string | null,
    public taskId: string | null,
    public requirementId: string | null,
    public flowId: string | null,
    public nodeId: string | null,
    public version: string | null,
    public type: FindingType,
    public description: string,
    public severity: FindingSeverity,
    public frequency: number,
    public impact: FindingImpact,
    public priority: FindingPriority,
    public recommendation: string | null,
    public status: FindingStatus,
    public emotionInferred: string | null,
    public textualSentiment: string | null,
    public userComment: string | null,
    public expertComment: string | null,
    public userCommentId: string | null,
    public expertCommentId: string | null,
    public aggregatedFrom: string[],
    public occurrences: number,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  // Métodos de dominio
  updateDetails(
    description: string,
    type: FindingType,
    severity: FindingSeverity,
    impact: FindingImpact,
    priority: FindingPriority,
    recommendation: string | null,
  ): void {
    this.description = description;
    this.type = type;
    this.severity = severity;
    this.impact = impact;
    this.priority = priority;
    this.recommendation = recommendation;
    this.updatedAt = new Date();
  }

  updateStatus(status: FindingStatus): void {
    this.status = status;
    this.updatedAt = new Date();
  }

  incrementOccurrences(): void {
    this.occurrences += 1;
    this.updatedAt = new Date();
  }

  addSource(sourceId: string): void {
    if (!this.aggregatedFrom.includes(sourceId)) {
      this.aggregatedFrom.push(sourceId);
      this.updatedAt = new Date();
    }
  }

  isResolved(): boolean {
    return this.status === FindingStatus.RESOLVED;
  }

  isCritical(): boolean {
    return this.severity === FindingSeverity.CRITICAL;
  }

  getSeverityScore(): number {
    const scores = {
      [FindingSeverity.LOW]: 1,
      [FindingSeverity.MEDIUM]: 2,
      [FindingSeverity.HIGH]: 3,
      [FindingSeverity.CRITICAL]: 4,
    };
    return scores[this.severity] || 0;
  }

  getPriorityScore(): number {
    const scores = {
      [FindingPriority.LOW]: 1,
      [FindingPriority.MEDIUM]: 2,
      [FindingPriority.HIGH]: 3,
    };
    return scores[this.priority] || 0;
  }

  isActive(): boolean {
    return this.status === FindingStatus.PENDING || 
           this.status === FindingStatus.IN_PROGRESS;
  }
}