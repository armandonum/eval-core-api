import { Inject, Injectable } from '@nestjs/common';
import {
  HeuristicTaskRepository,
  HEURISTIC_TASK_REPOSITORY,
} from '../../domain/interfaces/heuristic-task.repository';

@Injectable()
export class ReorderTasksUseCase {
  constructor(
    @Inject(HEURISTIC_TASK_REPOSITORY)
    private readonly repository: HeuristicTaskRepository,
  ) {}

  async execute(evaluationId: string, taskIds: string[]): Promise<void> {
    await this.repository.reorder(evaluationId, taskIds);
  }
}