import { HeuristicEvaluation } from '../entities/heuristic-evaluation.entity';

export interface HeuristicEvaluationRepository {
  create(evaluation: HeuristicEvaluation): Promise<HeuristicEvaluation>;
  findAll(): Promise<HeuristicEvaluation[]>;
  findById(id: string): Promise<HeuristicEvaluation | null>;
  findBySupervisor(supervisorId: string): Promise<HeuristicEvaluation[]>;
  findByProject(projectId: string): Promise<HeuristicEvaluation[]>;
  update(id: string, evaluation: Partial<HeuristicEvaluation>): Promise<HeuristicEvaluation>;
  delete(id: string): Promise<void>;
}

