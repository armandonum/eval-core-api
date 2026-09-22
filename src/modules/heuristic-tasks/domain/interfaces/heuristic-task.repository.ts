import { HeuristicTask } from '../entities/heuristic-task.entity';

export interface HeuristicTaskRepository {
  create(task: HeuristicTask): Promise<HeuristicTask>;
  findAll(): Promise<HeuristicTask[]>;
  findById(id: string): Promise<HeuristicTask | null>;
  findByEvaluation(evaluationId: string): Promise<HeuristicTask[]>;
  findByProjectTask(projectTaskId: string): Promise<HeuristicTask[]>;
  findMaxOrderIndex(evaluationId: string): Promise<number>;
  update(id: string, task: Partial<HeuristicTask>): Promise<HeuristicTask>;
  reorder(evaluationId: string, taskIds: string[]): Promise<void>;
  delete(id: string): Promise<void>;
  deleteByEvaluation(evaluationId: string): Promise<void>;
}

export const HEURISTIC_TASK_REPOSITORY = 'HEURISTIC_TASK_REPOSITORY';