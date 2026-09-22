import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicObservationRepository,
  HEURISTIC_OBSERVATION_REPOSITORY,
} from '../../domain/interfaces/heuristic-observation.repository';
import { HeuristicObservation } from '../../domain/entities/heuristic-observation.entity';
import { UpdateHeuristicObservationDto } from '../dtos/update-heuristic-observation.dto';

@Injectable()
export class UpdateHeuristicObservationUseCase {
  constructor(
    @Inject(HEURISTIC_OBSERVATION_REPOSITORY)
    private readonly repository: HeuristicObservationRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateHeuristicObservationDto,
  ): Promise<HeuristicObservation> {
    const observation = await this.repository.findById(id);
    if (!observation) {
      throw new NotFoundException(`Observación con ID ${id} no encontrada`);
    }

    observation.update(
      dto.description,
      dto.severity,
      dto.frequency,
      dto.recommendation,
      dto.nodeId,
      dto.screenIdentifier,
    );

    return this.repository.update(id, observation);
  }
}