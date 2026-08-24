// infrastructure/typeorm/cognitive-evaluation.mapper.ts
import { CognitiveEvaluation } from '../../domain/entities/cognitive-evaluation.entity';
import { CognitiveEvaluationOrmEntity } from './cognitive-evaluation.orm-entity';
import { CognitiveEvaluationStatus } from '../../domain/enums/cognitive-evaluation-status.enum';

export class CognitiveEvaluationMapper {
  static toDomain(orm: CognitiveEvaluationOrmEntity): CognitiveEvaluation {
    return new CognitiveEvaluation(
      orm.cognitive_evaluations_id,
      orm.project_id,
      orm.name,
      orm.description,
      orm.supervisor_id,
      orm.status,
      orm.max_duration_minutes,
      orm.target_user_description,
      orm.system_description,
      orm.started_at,
      orm.completed_at,
      orm.created_at,
      orm.updated_at,
    );
  }

  static toPersistence(domain: CognitiveEvaluation): Partial<CognitiveEvaluationOrmEntity> {
    return {
      cognitive_evaluations_id: domain.cognitiveEvaluationId,
      project_id: domain.projectId,
      name: domain.name,
      description: domain.description,
      supervisor_id: domain.supervisorId,
      status: domain.status,
      max_duration_minutes: domain.maxDurationMinutes,
      target_user_description: domain.targetUserDescription,
      system_description: domain.systemDescription,
      started_at: domain.startedAt,
      completed_at: domain.completedAt,
      created_at: domain.createdAt,
      updated_at: domain.updatedAt,
    };
  }

  static toDomainArray(orms: CognitiveEvaluationOrmEntity[]): CognitiveEvaluation[] {
    return orms.map(orm => this.toDomain(orm));
  }
}