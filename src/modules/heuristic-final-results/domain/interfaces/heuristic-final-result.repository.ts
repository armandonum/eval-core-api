import { HeuristicFinalResult } from '../entities/heuristic-final-result.entity';

export interface HeuristicFinalResultRepository {
  create(result: HeuristicFinalResult): Promise<HeuristicFinalResult>;
  findAll(): Promise<HeuristicFinalResult[]>;
  findById(id: string): Promise<HeuristicFinalResult | null>;
  findByEvaluation(evaluationId: string): Promise<HeuristicFinalResult | null>;
  update(id: string, result: Partial<HeuristicFinalResult>): Promise<HeuristicFinalResult>;
  upsert(evaluationId: string, result: HeuristicFinalResult): Promise<HeuristicFinalResult>;
  delete(id: string): Promise<void>;
  deleteByEvaluation(evaluationId: string): Promise<void>;
}

export const HEURISTIC_FINAL_RESULT_REPOSITORY = 'HEURISTIC_FINAL_RESULT_REPOSITORY';