import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  HeuristicFinalResultRepository,
  HEURISTIC_FINAL_RESULT_REPOSITORY,
} from '../../domain/interfaces/heuristic-final-result.repository';
import { HeuristicFinalResult } from '../../domain/entities/heuristic-final-result.entity';

@Injectable()
export class FindFinalResultsByEvaluationUseCase {
  constructor(
    @Inject(HEURISTIC_FINAL_RESULT_REPOSITORY)
    private readonly repository: HeuristicFinalResultRepository,
  ) {}

  async execute(evaluationId: string): Promise<HeuristicFinalResult> {
    const result = await this.repository.findByEvaluation(evaluationId);
    if (!result) {
      throw new NotFoundException(
        `No hay resultados finales para la evaluación ${evaluationId}`,
      );
    }
    return result;
  }
}