import { Inject, Injectable } from '@nestjs/common';
import {
  HeuristicEvaluatorRepository,
  HEURISTIC_EVALUATOR_REPOSITORY,
} from '../../domain/interfaces/heuristic-evaluator.repository';
import { HeuristicEvaluator } from '../../domain/entities/heuristic-evaluator.entity';

@Injectable()
export class FindAllEvaluatorsByEvaluationUseCase {
  constructor(
    @Inject(HEURISTIC_EVALUATOR_REPOSITORY)
    private readonly repository: HeuristicEvaluatorRepository,
  ) {}

  async execute(evaluationId: string): Promise<HeuristicEvaluator[]> {
    return this.repository.findByEvaluation(evaluationId);
  }
}