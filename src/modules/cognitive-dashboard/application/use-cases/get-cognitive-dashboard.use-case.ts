// application/use-cases/get-cognitive-dashboard.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICognitiveDashboardRepository } from '../../domain/interfaces/cognitive-dashboard.repository';
import { CognitiveDashboardDto } from '../dtos/cognitive-dashboard.dto';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class GetCognitiveDashboardUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_DASHBOARD)
    private readonly repository: ICognitiveDashboardRepository,
  ) {}

  async execute(evaluationId: string): Promise<CognitiveDashboardDto> {
    const stats = await this.repository.getDashboardStats(evaluationId);
    const evaluatorProgress = await this.repository.getEvaluatorProgress(evaluationId);
    const evaluationName = await this.repository.getEvaluationName(evaluationId);

    return {
      evaluationId,
      evaluationName,
      status: 'in_progress',
      progressPercentage: stats.progressPercentage,
      taskStats: {
        total: stats.totalTasks,
        completed: stats.completedTasks,
        inProgress: stats.inProgressTasks,
        failed: stats.failedTasks,
        pending: stats.pendingTasks,
      },
      evaluatorStats: {
        total: stats.totalEvaluators,
        completed: stats.completedEvaluators,
        pending: stats.pendingEvaluators,
      },
      responseStats: {
        total: stats.totalResponses,
        completed: stats.completedResponses,
        pending: stats.pendingResponses,
        withIssues: stats.responsesWithIssues,
        averageTimeSeconds: stats.averageTimeSeconds,
        successRate: stats.successRate,
      },
      questionSummary: {
        q1: { yes: stats.q1Yes, no: stats.q1No, uncertain: stats.q1Uncertain },
        q2: { yes: stats.q2Yes, no: stats.q2No, uncertain: stats.q2Uncertain },
        q3: { yes: stats.q3Yes, no: stats.q3No, uncertain: stats.q3Uncertain },
        q4: { yes: stats.q4Yes, no: stats.q4No, uncertain: stats.q4Uncertain },
      },
      evaluatorProgress,
    };
  }
}