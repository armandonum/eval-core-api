// domain/interfaces/cognitive-task.repository.ts
import { CognitiveTask } from '../entities/cognitive-task.entity';
import { CognitiveTaskStatus } from '../enums/cognitive-task-status.enum';

export interface ICognitiveTaskRepository {
  create(task: CognitiveTask): Promise<CognitiveTask>;
  update(task: CognitiveTask): Promise<CognitiveTask>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<CognitiveTask | null>;
  findAll(): Promise<CognitiveTask[]>;
  findByEvaluation(evaluationId: string): Promise<CognitiveTask[]>;
  findByStatus(status: CognitiveTaskStatus): Promise<CognitiveTask[]>;
  findByEvaluationAndStatus(evaluationId: string, status: CognitiveTaskStatus): Promise<CognitiveTask[]>;
  updateStatus(id: string, status: CognitiveTaskStatus): Promise<CognitiveTask>;
  updateOrder(id: string, orderIndex: number): Promise<CognitiveTask>;
  countByEvaluation(evaluationId: string): Promise<number>;
  countByStatus(status: CognitiveTaskStatus): Promise<number>;
  getMaxOrderIndex(evaluationId: string): Promise<number>;
  reorderTasks(evaluationId: string, taskIds: string[]): Promise<void>;
}

