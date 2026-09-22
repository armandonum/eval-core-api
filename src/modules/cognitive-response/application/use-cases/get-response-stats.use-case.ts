
// application/use-cases/get-response-stats.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICognitiveResponseRepository } from '../../domain/interfaces/cognitive-response.repository';
import { ICognitiveEvaluationRepository } from '../../../cognitive-evaluation/domain/interfaces/cognitive-evaluation.repository';
import { CognitiveResponseStatsDto } from '../dtos/cognitive-response-stats.dto';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class GetResponseStatsUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_RESPONSES)
    private readonly responseRepository: ICognitiveResponseRepository,
    @Inject(INJECTION_TOKENS.COGNITIVE_EVALUATIONS)
    private readonly evaluationRepository: ICognitiveEvaluationRepository,
  ) {}

  async execute(evaluationId: string): Promise<CognitiveResponseStatsDto> {
    const evaluation = await this.evaluationRepository.findById(evaluationId);
    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    const stats = await this.responseRepository.getStatsByEvaluation(evaluationId);

    return {
      total: stats.total,
      completed: stats.completed,
      pending: stats.pending,
      skipped: stats.skipped,
      withIssues: stats.withIssues,
      averageTimeSeconds: stats.averageTimeSeconds,
      successRate: stats.successRate,
      questionStats: stats.questionStats,
    };
  }
}