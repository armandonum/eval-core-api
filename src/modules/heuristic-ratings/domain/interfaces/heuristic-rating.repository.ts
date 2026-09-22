import { HeuristicRating } from '../entities/heuristic-rating.entity';

export interface HeuristicRatingRepository {
  create(rating: HeuristicRating): Promise<HeuristicRating>;
  findAll(): Promise<HeuristicRating[]>;
  findById(id: string): Promise<HeuristicRating | null>;
  findByEvaluation(evaluationId: string): Promise<HeuristicRating[]>;
  findByObservation(problemId: string): Promise<HeuristicRating[]>;
  findBySession(sessionId: string): Promise<HeuristicRating[]>;
  findByEvaluator(evaluatorId: string): Promise<HeuristicRating[]>;
  findByEvaluationAndObservation(
    evaluationId: string,
    problemId: string,
  ): Promise<HeuristicRating[]>;
  findExistingRating(
    evaluationId: string,
    evaluatorId: string,
    problemId: string,
  ): Promise<HeuristicRating | null>;
  update(id: string, rating: Partial<HeuristicRating>): Promise<HeuristicRating>;
  delete(id: string): Promise<void>;
  deleteByEvaluation(evaluationId: string): Promise<void>;
  deleteByObservation(problemId: string): Promise<void>;
}

export const HEURISTIC_RATING_REPOSITORY = 'HEURISTIC_RATING_REPOSITORY';