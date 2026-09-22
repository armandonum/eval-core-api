import { Inject, Injectable } from '@nestjs/common';
import {
  HeuristicTaskProgressRepository,
  HEURISTIC_TASK_PROGRESS_REPOSITORY,
} from '../../domain/interfaces/heuristic-task-progress.repository';
import { HeuristicTaskProgress } from '../../domain/entities/heuristic-task-progress.entity';

@Injectable()
export class FindProgressByEvaluatorUseCase {
  constructor(
    @Inject(HEURISTIC_TASK_PROGRESS_REPOSITORY)
    private readonly repository: HeuristicTaskProgressRepository,
  ) {}

  async execute(evaluatorId: string): Promise<HeuristicTaskProgress[]> {
    return this.repository.findByEvaluator(evaluatorId);
  }
}