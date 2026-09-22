import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicPositiveAspectRepository,
  HEURISTIC_POSITIVE_ASPECT_REPOSITORY,
} from '../../domain/interfaces/heuristic-positive-aspect.repository';
import { HeuristicPositiveAspect } from '../../domain/entities/heuristic-positive-aspect.entity';
import { UpdatePositiveAspectDto } from '../dtos/update-positive-aspect.dto';

@Injectable()
export class UpdatePositiveAspectUseCase {
  constructor(
    @Inject(HEURISTIC_POSITIVE_ASPECT_REPOSITORY)
    private readonly repository: HeuristicPositiveAspectRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdatePositiveAspectDto,
  ): Promise<HeuristicPositiveAspect> {
    const aspect = await this.repository.findById(id);
    if (!aspect) {
      throw new NotFoundException(`Aspecto positivo con ID ${id} no encontrado`);
    }

    if (dto.description !== undefined) {
      aspect.update(dto.description);
    }

    return this.repository.update(id, aspect);
  }
}