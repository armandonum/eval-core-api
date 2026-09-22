import { Inject, Injectable } from '@nestjs/common';
import {
  HeuristicFinalResultRepository,
  HEURISTIC_FINAL_RESULT_REPOSITORY,
} from '../../domain/interfaces/heuristic-final-result.repository';
import { HeuristicFinalResult } from '../../domain/entities/heuristic-final-result.entity';
import { GenerateFinalResultsUseCase } from './generate-final-results.use-case';

@Injectable()
export class RecalculateFinalResultsUseCase {
  constructor(
    private readonly generateUseCase: GenerateFinalResultsUseCase,
  ) {}

  async execute(evaluationId: string): Promise<HeuristicFinalResult> {
    return this.generateUseCase.execute({ evaluationId });
  }
}