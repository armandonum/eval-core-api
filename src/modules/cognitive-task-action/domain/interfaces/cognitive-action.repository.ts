// domain/interfaces/cognitive-action.repository.ts
import { CognitiveAction } from '../entities/cognitive-action.entity';

export interface ICognitiveActionRepository {
  create(action: CognitiveAction): Promise<CognitiveAction>;
  update(action: CognitiveAction): Promise<CognitiveAction>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<CognitiveAction | null>;
  findAll(): Promise<CognitiveAction[]>;
  findByTask(taskId: string): Promise<CognitiveAction[]>;
  findByTaskOrdered(taskId: string): Promise<CognitiveAction[]>;
  getMaxStepOrder(taskId: string): Promise<number>;
  reorderActions(taskId: string, actionIds: string[]): Promise<void>;
  duplicateActions(taskId: string, targetTaskId: string): Promise<CognitiveAction[]>;
  deleteByTask(taskId: string): Promise<void>;
  countByTask(taskId: string): Promise<number>;
}

export interface FindActionsOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  taskId?: string;
}