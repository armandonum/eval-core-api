import { Inject, Injectable } from '@nestjs/common';
import {
  HeuristicRatingRepository,
  HEURISTIC_RATING_REPOSITORY,
} from '../../domain/interfaces/heuristic-rating.repository';
import { HeuristicRating } from '../../domain/entities/heuristic-rating.entity';

@Injectable()
export class FindAllRatingsByObservationUseCase {
  constructor(
    @Inject(HEURISTIC_RATING_REPOSITORY)
    private readonly repository: HeuristicRatingRepository,
  ) {}

  async execute(problemId: string): Promise<HeuristicRating[]> {
    return this.repository.findByObservation(problemId);
  }
}