import { HeuristicPositiveAspect } from '../entities/heuristic-positive-aspect.entity';

export interface HeuristicPositiveAspectRepository {
  create(aspect: HeuristicPositiveAspect): Promise<HeuristicPositiveAspect>;
  findAll(): Promise<HeuristicPositiveAspect[]>;
  findById(id: string): Promise<HeuristicPositiveAspect | null>;
  findByEvaluation(evaluationId: string): Promise<HeuristicPositiveAspect[]>;
  findBySession(sessionId: string): Promise<HeuristicPositiveAspect[]>;
  findByEvaluator(evaluatorId: string): Promise<HeuristicPositiveAspect[]>;
  countByEvaluation(evaluationId: string): Promise<number>;
  update(id: string, aspect: Partial<HeuristicPositiveAspect>): Promise<HeuristicPositiveAspect>;
  delete(id: string): Promise<void>;
  deleteByEvaluation(evaluationId: string): Promise<void>;
  deleteBySession(sessionId: string): Promise<void>;
}

export const HEURISTIC_POSITIVE_ASPECT_REPOSITORY = 'HEURISTIC_POSITIVE_ASPECT_REPOSITORY';