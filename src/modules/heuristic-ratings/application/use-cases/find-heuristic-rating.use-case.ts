import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicRatingRepository,
  HEURISTIC_RATING_REPOSITORY,
} from '../../domain/interfaces/heuristic-rating.repository';
import { HeuristicRating } from '../../domain/entities/heuristic-rating.entity';

@Injectable()
export class FindHeuristicRatingUseCase {
  constructor(
    @Inject(HEURISTIC_RATING_REPOSITORY)
    private readonly repository: HeuristicRatingRepository,
  ) {}

  async execute(id: string): Promise<HeuristicRating> {
    const rating = await this.repository.findById(id);
    if (!rating) {
      throw new NotFoundException(`Calificación con ID ${id} no encontrada`);
    }
    return rating;
  }
}