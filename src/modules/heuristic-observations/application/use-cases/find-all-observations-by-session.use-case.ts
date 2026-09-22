import { Inject, Injectable } from '@nestjs/common';
import {
  HeuristicObservationRepository,
  HEURISTIC_OBSERVATION_REPOSITORY,
} from '../../domain/interfaces/heuristic-observation.repository';
import { HeuristicObservation } from '../../domain/entities/heuristic-observation.entity';

@Injectable()
export class FindAllObservationsBySessionUseCase {
  constructor(
    @Inject(HEURISTIC_OBSERVATION_REPOSITORY)
    private readonly repository: HeuristicObservationRepository,
  ) {}

  async execute(sessionId: string): Promise<HeuristicObservation[]> {
    return this.repository.findBySession(sessionId);
  }
}