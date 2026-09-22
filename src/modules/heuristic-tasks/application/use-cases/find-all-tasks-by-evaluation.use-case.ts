import { Inject, Injectable } from '@nestjs/common';
import {
  HeuristicTaskRepository,
  HEURISTIC_TASK_REPOSITORY,
} from '../../domain/interfaces/heuristic-task.repository';
import { HeuristicTask } from '../../domain/entities/heuristic-task.entity';

@Injectable()
export class FindAllTasksByEvaluationUseCase {
  constructor(
    @Inject(HEURISTIC_TASK_REPOSITORY)
    private readonly repository: HeuristicTaskRepository,
  ) {}

  async execute(evaluationId: string): Promise<HeuristicTask[]> {
    return this.repository.findByEvaluation(evaluationId);
  }
}