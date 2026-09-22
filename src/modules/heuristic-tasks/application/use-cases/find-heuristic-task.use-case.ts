import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicTaskRepository,
  HEURISTIC_TASK_REPOSITORY,
} from '../../domain/interfaces/heuristic-task.repository';
import { HeuristicTask } from '../../domain/entities/heuristic-task.entity';

@Injectable()
export class FindHeuristicTaskUseCase {
  constructor(
    @Inject(HEURISTIC_TASK_REPOSITORY)
    private readonly repository: HeuristicTaskRepository,
  ) {}

  async execute(id: string): Promise<HeuristicTask> {
    const task = await this.repository.findById(id);
    if (!task) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    return task;
  }
}