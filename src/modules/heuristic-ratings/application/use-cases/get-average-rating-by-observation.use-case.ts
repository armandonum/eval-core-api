import { Inject, Injectable } from '@nestjs/common';
import {
  HeuristicRatingRepository,
  HEURISTIC_RATING_REPOSITORY,
} from '../../domain/interfaces/heuristic-rating.repository';

export interface AverageRating {
  problemId: string;
  avgSeverity: number;
  avgFrequency: number;
  avgCriticality: number;
  totalRatings: number;
}

@Injectable()
export class GetAverageRatingByObservationUseCase {
  constructor(
    @Inject(HEURISTIC_RATING_REPOSITORY)
    private readonly repository: HeuristicRatingRepository,
  ) {}

  async execute(problemId: string): Promise<AverageRating> {
    const ratings = await this.repository.findByObservation(problemId);

    if (ratings.length === 0) {
      return {
        problemId,
        avgSeverity: 0,
        avgFrequency: 0,
        avgCriticality: 0,
        totalRatings: 0,
      };
    }

    const totalSeverity = ratings.reduce((sum, r) => sum + r.severity, 0);
    const totalFrequency = ratings.reduce((sum, r) => sum + r.frequency, 0);
    const totalCriticality = ratings.reduce((sum, r) => sum + r.getCriticality(), 0);

    return {
      problemId,
      avgSeverity: parseFloat((totalSeverity / ratings.length).toFixed(1)),
      avgFrequency: parseFloat((totalFrequency / ratings.length).toFixed(1)),
      avgCriticality: parseFloat((totalCriticality / ratings.length).toFixed(1)),
      totalRatings: ratings.length,
    };
  }
}