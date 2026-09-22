import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicObservationRepository,
  HEURISTIC_OBSERVATION_REPOSITORY,
} from '../../domain/interfaces/heuristic-observation.repository';

@Injectable()
export class DeleteHeuristicObservationUseCase {
  constructor(
    @Inject(HEURISTIC_OBSERVATION_REPOSITORY)
    private readonly repository: HeuristicObservationRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const observation = await this.repository.findById(id);
    if (!observation) {
      throw new NotFoundException(`Observación con ID ${id} no encontrada`);
    }
    await this.repository.delete(id);
  }
}