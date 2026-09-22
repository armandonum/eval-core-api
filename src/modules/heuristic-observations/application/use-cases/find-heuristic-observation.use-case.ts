import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicObservationRepository,
  HEURISTIC_OBSERVATION_REPOSITORY,
} from '../../domain/interfaces/heuristic-observation.repository';
import { HeuristicObservation } from '../../domain/entities/heuristic-observation.entity';

@Injectable()
export class FindHeuristicObservationUseCase {
  constructor(
    @Inject(HEURISTIC_OBSERVATION_REPOSITORY)
    private readonly repository: HeuristicObservationRepository,
  ) {}

  async execute(id: string): Promise<HeuristicObservation> {
    const observation = await this.repository.findById(id);
    if (!observation) {
      throw new NotFoundException(`Observación con ID ${id} no encontrada`);
    }
    return observation;
  }
}