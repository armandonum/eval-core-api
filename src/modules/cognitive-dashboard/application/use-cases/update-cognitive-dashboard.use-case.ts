// application/use-cases/update-cognitive-dashboard.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { ICognitiveDashboardRepository } from '../../domain/interfaces/cognitive-dashboard.repository';
import { CognitiveDashboard } from '../../domain/entities/cognitive-dashboard.entity';
import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens';

@Injectable()
export class UpdateCognitiveDashboardUseCase {
  constructor(
    @Inject(INJECTION_TOKENS.COGNITIVE_DASHBOARD)
    private readonly repository: ICognitiveDashboardRepository,
  ) {}

  async execute(evaluationId: string): Promise<void> {
    const stats = await this.repository.getDashboardStats(evaluationId);
    
    const dashboard = new CognitiveDashboard(
      crypto.randomUUID(),
      evaluationId,
      stats.totalTasks,
      stats.completedTasks,
      stats.inProgressTasks,
      stats.failedTasks,
      stats.pendingTasks,
      stats.totalEvaluators,
      stats.completedEvaluators,
      stats.pendingEvaluators,
      stats.totalResponses,
      stats.completedResponses,
      stats.pendingResponses,
      stats.responsesWithIssues,
      stats.averageTimeSeconds,
      stats.successRate,
      stats.q1Yes,
      stats.q1No,
      stats.q1Uncertain,
      stats.q2Yes,
      stats.q2No,
      stats.q2Uncertain,
      stats.q3Yes,
      stats.q3No,
      stats.q3Uncertain,
      stats.q4Yes,
      stats.q4No,
      stats.q4Uncertain,
      stats.progressPercentage,
      new Date(),
      new Date(),
    );

    await this.repository.saveDashboardSummary(dashboard);
  }
}