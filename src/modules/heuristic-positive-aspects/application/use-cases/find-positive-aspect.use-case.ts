import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicPositiveAspectRepository,
  HEURISTIC_POSITIVE_ASPECT_REPOSITORY,
} from '../../domain/interfaces/heuristic-positive-aspect.repository';
import { HeuristicPositiveAspect } from '../../domain/entities/heuristic-positive-aspect.entity';

@Injectable()
export class FindPositiveAspectUseCase {
  constructor(
    @Inject(HEURISTIC_POSITIVE_ASPECT_REPOSITORY)
    private readonly repository: HeuristicPositiveAspectRepository,
  ) {}

  async execute(id: string): Promise<HeuristicPositiveAspect> {
    const aspect = await this.repository.findById(id);
    if (!aspect) {
      throw new NotFoundException(`Aspecto positivo con ID ${id} no encontrado`);
    }
    return aspect;
  }
}