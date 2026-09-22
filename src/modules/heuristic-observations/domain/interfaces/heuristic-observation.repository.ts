import { HeuristicObservation } from '../entities/heuristic-observation.entity';

export interface HeuristicObservationRepository {
  create(observation: HeuristicObservation): Promise<HeuristicObservation>;
  findAll(): Promise<HeuristicObservation[]>;
  findById(id: string): Promise<HeuristicObservation | null>;
  findByEvaluation(evaluationId: string): Promise<HeuristicObservation[]>;
  findBySession(sessionId: string): Promise<HeuristicObservation[]>;
  findByPrinciple(principleId: string): Promise<HeuristicObservation[]>;
  findByEvaluator(evaluatorId: string): Promise<HeuristicObservation[]>;
  countByEvaluation(evaluationId: string): Promise<number>;
  update(id: string, observation: Partial<HeuristicObservation>): Promise<HeuristicObservation>;
  delete(id: string): Promise<void>;
  deleteByEvaluation(evaluationId: string): Promise<void>;
  deleteBySession(sessionId: string): Promise<void>;
}

export const HEURISTIC_OBSERVATION_REPOSITORY = 'HEURISTIC_OBSERVATION_REPOSITORY';