import { Inject, Injectable } from '@nestjs/common';
import {
  HeuristicObservationRepository,
  HEURISTIC_OBSERVATION_REPOSITORY,
} from '../../domain/interfaces/heuristic-observation.repository';
import { HeuristicObservation } from '../../domain/entities/heuristic-observation.entity';

@Injectable()
export class FindAllObservationsByPrincipleUseCase {
  constructor(
    @Inject(HEURISTIC_OBSERVATION_REPOSITORY)
    private readonly repository: HeuristicObservationRepository,
  ) {}

  async execute(principleId: string): Promise<HeuristicObservation[]> {
    return this.repository.findByPrinciple(principleId);
  }
}