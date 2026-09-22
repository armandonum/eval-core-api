// domain/interfaces/finding.repository.ts
import { Finding } from '../entities/finding.entity';
import { FindingType } from '../enums/finding-type.enum';
import { FindingSeverity } from '../enums/finding-severity.enum';
import { FindingStatus } from '../enums/finding-status.enum';

export interface IFindingRepository {
  create(finding: Finding): Promise<Finding>;
  update(finding: Finding): Promise<Finding>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Finding | null>;
  findAll(options?: FindFindingsOptions): Promise<Finding[]>;
  findByEvaluation(evaluationId: string): Promise<Finding[]>;
  findBySession(sessionId: string): Promise<Finding[]>;
  findByTask(taskId: string): Promise<Finding[]>;
  findByStatus(status: FindingStatus): Promise<Finding[]>;
  findBySeverity(severity: FindingSeverity): Promise<Finding[]>;
  findByType(type: FindingType): Promise<Finding[]>;
  countByEvaluation(evaluationId: string): Promise<number>;
  countByStatus(evaluationId: string): Promise<Record<FindingStatus, number>>;
  countBySeverity(evaluationId: string): Promise<Record<FindingSeverity, number>>;
  getSummary(evaluationId: string): Promise<FindingSummary>;
  deleteByEvaluation(evaluationId: string): Promise<void>;
}

export interface FindFindingsOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  evaluationId?: string;
  sessionId?: string;
  taskId?: string;
  status?: FindingStatus;
  severity?: FindingSeverity;
  type?: FindingType;
  search?: string;
}

export interface FindingSummary {
  total: number;
  byStatus: Record<FindingStatus, number>;
  bySeverity: Record<FindingSeverity, number>;
  byType: Record<FindingType, number>;
  active: number;
  resolved: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  resolutionRate: number;
}