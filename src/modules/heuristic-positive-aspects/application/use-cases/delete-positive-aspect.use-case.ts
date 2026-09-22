import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicPositiveAspectRepository,
  HEURISTIC_POSITIVE_ASPECT_REPOSITORY,
} from '../../domain/interfaces/heuristic-positive-aspect.repository';

@Injectable()
export class DeletePositiveAspectUseCase {
  constructor(
    @Inject(HEURISTIC_POSITIVE_ASPECT_REPOSITORY)
    private readonly repository: HeuristicPositiveAspectRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const aspect = await this.repository.findById(id);
    if (!aspect) {
      throw new NotFoundException(`Aspecto positivo con ID ${id} no encontrado`);
    }
    await this.repository.delete(id);
  }
}