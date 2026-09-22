// infrastructure/typeorm/finding.mapper.ts
import { Finding } from '../../domain/entities/finding.entity';
import { FindingOrmEntity } from './finding.orm-entity';

export class FindingMapper {
  static toDomain(orm: FindingOrmEntity): Finding {
    return new Finding(
      orm.finding_id,
      orm.evaluation_id,
      orm.session_id,
      orm.task_id,
      orm.requirement_id,
      orm.flow_id,
      orm.node_id,
      orm.version,
      orm.type,
      orm.description,
      orm.severity,
      orm.frequency,
      orm.impact,
      orm.priority,
      orm.recommendation,
      orm.status,
      orm.emotion_inferred,
      orm.textual_sentiment,
      orm.user_comment,
      orm.expert_comment,
      orm.user_comment_id,
      orm.expert_comment_id,
      orm.aggregated_from || [],
      orm.occurrences,
      orm.created_at,
      orm.updated_at,
    );
  }

  static toPersistence(domain: Finding): Partial<FindingOrmEntity> {
    return {
      finding_id: domain.findingId,
      evaluation_id: domain.evaluationId,
      session_id: domain.sessionId,
      task_id: domain.taskId,
      requirement_id: domain.requirementId,
      flow_id: domain.flowId,
      node_id: domain.nodeId,
      version: domain.version,
      type: domain.type,
      description: domain.description,
      severity: domain.severity,
      frequency: domain.frequency,
      impact: domain.impact,
      priority: domain.priority,
      recommendation: domain.recommendation,
      status: domain.status,
      emotion_inferred: domain.emotionInferred,
      textual_sentiment: domain.textualSentiment,
      user_comment: domain.userComment,
      expert_comment: domain.expertComment,
      user_comment_id: domain.userCommentId,
      expert_comment_id: domain.expertCommentId,
      aggregated_from: domain.aggregatedFrom,
      occurrences: domain.occurrences,
      created_at: domain.createdAt,
      updated_at: domain.updatedAt,
    };
  }

  static toDomainArray(orms: FindingOrmEntity[]): Finding[] {
    return orms.map(orm => this.toDomain(orm));
  }
}