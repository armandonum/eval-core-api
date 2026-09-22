import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicRatingRepository,
  HEURISTIC_RATING_REPOSITORY,
} from '../../domain/interfaces/heuristic-rating.repository';
import { HeuristicRating } from '../../domain/entities/heuristic-rating.entity';
import { UpdateHeuristicRatingDto } from '../dtos/update-heuristic-rating.dto';

@Injectable()
export class UpdateHeuristicRatingUseCase {
  constructor(
    @Inject(HEURISTIC_RATING_REPOSITORY)
    private readonly repository: HeuristicRatingRepository,
  ) {}

  async execute(id: string, dto: UpdateHeuristicRatingDto): Promise<HeuristicRating> {
    const rating = await this.repository.findById(id);
    if (!rating) {
      throw new NotFoundException(`Calificación con ID ${id} no encontrada`);
    }

    rating.update(dto.severity, dto.frequency);

    return this.repository.update(id, rating);
  }
}