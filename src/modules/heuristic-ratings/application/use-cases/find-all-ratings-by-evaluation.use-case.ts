import { Inject, Injectable } from '@nestjs/common';
import {
  HeuristicRatingRepository,
  HEURISTIC_RATING_REPOSITORY,
} from '../../domain/interfaces/heuristic-rating.repository';
import { HeuristicRating } from '../../domain/entities/heuristic-rating.entity';

@Injectable()
export class FindAllRatingsByEvaluationUseCase {
  constructor(
    @Inject(HEURISTIC_RATING_REPOSITORY)
    private readonly repository: HeuristicRatingRepository,
  ) {}

  async execute(evaluationId: string): Promise<HeuristicRating[]> {
    return this.repository.findByEvaluation(evaluationId);
  }
}