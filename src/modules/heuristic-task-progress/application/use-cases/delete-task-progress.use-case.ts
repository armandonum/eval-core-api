import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicTaskProgressRepository,
  HEURISTIC_TASK_PROGRESS_REPOSITORY,
} from '../../domain/interfaces/heuristic-task-progress.repository';

@Injectable()
export class DeleteTaskProgressUseCase {
  constructor(
    @Inject(HEURISTIC_TASK_PROGRESS_REPOSITORY)
    private readonly repository: HeuristicTaskProgressRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const progress = await this.repository.findById(id);
    if (!progress) {
      throw new NotFoundException(`Progreso con ID ${id} no encontrado`);
    }
    await this.repository.delete(id);
  }
}