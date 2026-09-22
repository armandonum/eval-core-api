import { Inject, Injectable } from '@nestjs/common';
import {
  HeuristicEvaluationRepository,
} from '../../domain/interfaces/heuristic-evaluation.repository';
import { HeuristicEvaluation } from '../../domain/entities/heuristic-evaluation.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class FindEvaluationsByProjectUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.HEURISTIC_EVALUATION_REPOSITORY)
    private readonly repository: HeuristicEvaluationRepository,
  ) {}

  async execute(projectId: string): Promise<HeuristicEvaluation[]> {
    return this.repository.findByProject(projectId);
  }
}