import { HeuristicTaskProgress } from '../entities/heuristic-task-progress.entity';

export interface HeuristicTaskProgressRepository {
  create(progress: HeuristicTaskProgress): Promise<HeuristicTaskProgress>;
  findAll(): Promise<HeuristicTaskProgress[]>;
  findById(id: string): Promise<HeuristicTaskProgress | null>;
  findByEvaluator(evaluatorId: string): Promise<HeuristicTaskProgress[]>;
  findByTask(taskId: string): Promise<HeuristicTaskProgress[]>;
  findByEvaluation(evaluationId: string): Promise<HeuristicTaskProgress[]>;
  findBySession(sessionId: string): Promise<HeuristicTaskProgress[]>;
  findByEvaluationAndEvaluator(
    evaluationId: string,
    evaluatorId: string,
  ): Promise<HeuristicTaskProgress[]>;
  findByEvaluatorAndTask(
    evaluatorId: string,
    taskId: string,
  ): Promise<HeuristicTaskProgress | null>;
  upsert(progress: HeuristicTaskProgress): Promise<HeuristicTaskProgress>;
  update(id: string, progress: Partial<HeuristicTaskProgress>): Promise<HeuristicTaskProgress>;
  delete(id: string): Promise<void>;
  deleteByEvaluation(evaluationId: string): Promise<void>;
  deleteByEvaluator(evaluatorId: string): Promise<void>;
  deleteByTask(taskId: string): Promise<void>;
}

export const HEURISTIC_TASK_PROGRESS_REPOSITORY = 'HEURISTIC_TASK_PROGRESS_REPOSITORY';