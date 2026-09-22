import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicRatingRepository,
  HEURISTIC_RATING_REPOSITORY,
} from '../../domain/interfaces/heuristic-rating.repository';

@Injectable()
export class DeleteHeuristicRatingUseCase {
  constructor(
    @Inject(HEURISTIC_RATING_REPOSITORY)
    private readonly repository: HeuristicRatingRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const rating = await this.repository.findById(id);
    if (!rating) {
      throw new NotFoundException(`Calificación con ID ${id} no encontrada`);
    }
    await this.repository.delete(id);
  }
}