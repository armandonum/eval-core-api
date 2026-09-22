import { Inject, Injectable } from '@nestjs/common';
import {
  HeuristicObservationRepository,
  HEURISTIC_OBSERVATION_REPOSITORY,
} from '../../domain/interfaces/heuristic-observation.repository';
import { HeuristicObservation } from '../../domain/entities/heuristic-observation.entity';
import { CreateHeuristicObservationDto } from '../dtos/create-heuristic-observation.dto';

@Injectable()
export class CreateHeuristicObservationUseCase {
  constructor(
    @Inject(HEURISTIC_OBSERVATION_REPOSITORY)
    private readonly repository: HeuristicObservationRepository,
  ) {}

  async execute(dto: CreateHeuristicObservationDto): Promise<HeuristicObservation> {
    const observation = HeuristicObservation.create(
      dto.sessionId,
      dto.evaluationId,
      dto.evaluatorId,
      dto.taskId ?? null,
      dto.principleId,
      dto.description,
      dto.severity,
      dto.frequency,
      dto.recommendation ?? null,
      dto.nodeId ?? null,
      dto.screenIdentifier ?? null,
    );

    return this.repository.create(observation);
  }
}