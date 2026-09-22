import { Inject, Injectable } from '@nestjs/common';
import {
  HeuristicPositiveAspectRepository,
  HEURISTIC_POSITIVE_ASPECT_REPOSITORY,
} from '../../domain/interfaces/heuristic-positive-aspect.repository';
import { HeuristicPositiveAspect } from '../../domain/entities/heuristic-positive-aspect.entity';

@Injectable()
export class FindAllAspectsBySessionUseCase {
  constructor(
    @Inject(HEURISTIC_POSITIVE_ASPECT_REPOSITORY)
    private readonly repository: HeuristicPositiveAspectRepository,
  ) {}

  async execute(sessionId: string): Promise<HeuristicPositiveAspect[]> {
    return this.repository.findBySession(sessionId);
  }
}