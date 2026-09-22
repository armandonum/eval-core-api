// infrastructure/typeorm/cognitive-dashboard.mapper.ts
import { CognitiveDashboard } from '../../domain/entities/cognitive-dashboard.entity';
import { CognitiveDashboardOrmEntity } from './cognitive-dashboard.orm-entity';

export class CognitiveDashboardMapper {
  static toDomain(orm: CognitiveDashboardOrmEntity): CognitiveDashboard {
    return new CognitiveDashboard(
      orm.summary_id,
      orm.evaluation_id,
      orm.total_tasks,
      orm.completed_tasks,
      orm.in_progress_tasks,
      orm.failed_tasks,
      orm.pending_tasks,
      orm.total_evaluators,
      orm.completed_evaluators,
      orm.pending_evaluators,
      orm.total_responses,
      orm.completed_responses,
      orm.pending_responses,
      orm.responses_with_issues,
      orm.average_time_seconds,
      orm.success_rate,
      orm.q1_yes,
      orm.q1_no,
      orm.q1_uncertain,
      orm.q2_yes,
      orm.q2_no,
      orm.q2_uncertain,
      orm.q3_yes,
      orm.q3_no,
      orm.q3_uncertain,
      orm.q4_yes,
      orm.q4_no,
      orm.q4_uncertain,
      orm.progress_percentage,
      orm.calculated_at,
      orm.updated_at,
    );
  }

  static toPersistence(domain: CognitiveDashboard): Partial<CognitiveDashboardOrmEntity> {
    return {
      summary_id: domain.summaryId,
      evaluation_id: domain.evaluationId,
      total_tasks: domain.totalTasks,
      completed_tasks: domain.completedTasks,
      in_progress_tasks: domain.inProgressTasks,
      failed_tasks: domain.failedTasks,
      pending_tasks: domain.pendingTasks,
      total_evaluators: domain.totalEvaluators,
      completed_evaluators: domain.completedEvaluators,
      pending_evaluators: domain.pendingEvaluators,
      total_responses: domain.totalResponses,
      completed_responses: domain.completedResponses,
      pending_responses: domain.pendingResponses,
      responses_with_issues: domain.responsesWithIssues,
      average_time_seconds: domain.averageTimeSeconds,
      success_rate: domain.successRate,
      q1_yes: domain.q1Yes,
      q1_no: domain.q1No,
      q1_uncertain: domain.q1Uncertain,
      q2_yes: domain.q2Yes,
      q2_no: domain.q2No,
      q2_uncertain: domain.q2Uncertain,
      q3_yes: domain.q3Yes,
      q3_no: domain.q3No,
      q3_uncertain: domain.q3Uncertain,
      q4_yes: domain.q4Yes,
      q4_no: domain.q4No,
      q4_uncertain: domain.q4Uncertain,
      progress_percentage: domain.progressPercentage,
      calculated_at: domain.calculatedAt,
      updated_at: domain.updatedAt,
    };
  }

  static toDomainArray(orms: CognitiveDashboardOrmEntity[]): CognitiveDashboard[] {
    return orms.map(orm => this.toDomain(orm));
  }
}