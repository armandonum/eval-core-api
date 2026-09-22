import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicTaskRepository,
  HEURISTIC_TASK_REPOSITORY,
} from '../../domain/interfaces/heuristic-task.repository';

@Injectable()
export class DeleteHeuristicTaskUseCase {
  constructor(
    @Inject(HEURISTIC_TASK_REPOSITORY)
    private readonly repository: HeuristicTaskRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const task = await this.repository.findById(id);
    if (!task) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    await this.repository.delete(id);
  }
}