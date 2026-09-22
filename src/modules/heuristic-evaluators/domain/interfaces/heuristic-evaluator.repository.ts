import { HeuristicEvaluator } from '../entities/heuristic-evaluator.entity';

export interface HeuristicEvaluatorRepository {
  create(evaluator: HeuristicEvaluator): Promise<HeuristicEvaluator>;
  findAll(): Promise<HeuristicEvaluator[]>;
  findById(id: string): Promise<HeuristicEvaluator | null>;
  findByEvaluation(evaluationId: string): Promise<HeuristicEvaluator[]>;
  findByUser(userId: string): Promise<HeuristicEvaluator[]>;
  findByEvaluationAndUser(
    evaluationId: string,
    userId: string,
  ): Promise<HeuristicEvaluator | null>;
  countByEvaluation(evaluationId: string): Promise<number>;
  update(id: string, evaluator: Partial<HeuristicEvaluator>): Promise<HeuristicEvaluator>;
  delete(id: string): Promise<void>;
  deleteByEvaluation(evaluationId: string): Promise<void>;
}

export const HEURISTIC_EVALUATOR_REPOSITORY = 'HEURISTIC_EVALUATOR_REPOSITORY';