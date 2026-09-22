import { Inject, Injectable } from '@nestjs/common';
import {
  HeuristicPositiveAspectRepository,
  HEURISTIC_POSITIVE_ASPECT_REPOSITORY,
} from '../../domain/interfaces/heuristic-positive-aspect.repository';
import { HeuristicPositiveAspect } from '../../domain/entities/heuristic-positive-aspect.entity';
import { CreatePositiveAspectDto } from '../dtos/create-positive-aspect.dto';

@Injectable()
export class CreatePositiveAspectUseCase {
  constructor(
    @Inject(HEURISTIC_POSITIVE_ASPECT_REPOSITORY)
    private readonly repository: HeuristicPositiveAspectRepository,
  ) {}

  async execute(dto: CreatePositiveAspectDto): Promise<HeuristicPositiveAspect> {
    const aspect = HeuristicPositiveAspect.create(
      dto.sessionId,
      dto.evaluationId,
      dto.evaluatorId,
      dto.taskId ?? null,
      dto.description,
    );

    return this.repository.create(aspect);
  }
}