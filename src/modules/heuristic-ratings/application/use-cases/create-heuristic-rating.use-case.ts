import { Inject, Injectable, ConflictException } from '@nestjs/common';
import {
  HeuristicRatingRepository,
  HEURISTIC_RATING_REPOSITORY,
} from '../../domain/interfaces/heuristic-rating.repository';
import { HeuristicRating } from '../../domain/entities/heuristic-rating.entity';
import { CreateHeuristicRatingDto } from '../dtos/create-heuristic-rating.dto';

@Injectable()
export class CreateHeuristicRatingUseCase {
  constructor(
    @Inject(HEURISTIC_RATING_REPOSITORY)
    private readonly repository: HeuristicRatingRepository,
  ) {}

  async execute(dto: CreateHeuristicRatingDto): Promise<HeuristicRating> {
    // Verificar si el evaluador ya calificó este problema en esta evaluación
    const existing = await this.repository.findExistingRating(
      dto.evaluationId,
      dto.evaluatorId,
      dto.problemId,
    );

    if (existing) {
      throw new ConflictException(
        'El evaluador ya ha calificado este problema en esta evaluación',
      );
    }

    const rating = HeuristicRating.create(
      dto.evaluationId,
      dto.sessionId,
      dto.evaluatorId,
      dto.problemId,
      dto.severity,
      dto.frequency,
    );

    return this.repository.create(rating);
  }
}