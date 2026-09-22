import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicEvaluatorRepository,
  HEURISTIC_EVALUATOR_REPOSITORY,
} from '../../domain/interfaces/heuristic-evaluator.repository';
import { HeuristicEvaluator } from '../../domain/entities/heuristic-evaluator.entity';

@Injectable()
export class MarkEvaluatorCompletedUseCase {
  constructor(
    @Inject(HEURISTIC_EVALUATOR_REPOSITORY)
    private readonly repository: HeuristicEvaluatorRepository,
  ) {}

  async execute(id: string): Promise<HeuristicEvaluator> {
    const evaluator = await this.repository.findById(id);
    if (!evaluator) {
      throw new NotFoundException(`Evaluador con ID ${id} no encontrado`);
    }

    evaluator.markAsCompleted();

    return this.repository.update(id, evaluator);
  }
}