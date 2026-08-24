// infrastructure/typeorm/cognitive-evaluator.mapper.ts
import { CognitiveEvaluator } from '../../domain/entities/cognitive-evaluator.entity';
import { CognitiveEvaluatorOrmEntity } from './cognitive-evaluator.orm-entity';
import { CognitiveEvaluatorRole } from '../../domain/enums/cognitive-evaluator-role.enum';

export class CognitiveEvaluatorMapper {
  static toDomain(orm: CognitiveEvaluatorOrmEntity): CognitiveEvaluator {
    return new CognitiveEvaluator(
      orm.id,
      orm.evaluation_id,
      orm.user_id,
      orm.evaluator_role,
      orm.assigned_at,
      orm.completed_at,
      orm.notes,
    );
  }

  static toPersistence(domain: CognitiveEvaluator): Partial<CognitiveEvaluatorOrmEntity> {
    return {
      id: domain.id,
      evaluation_id: domain.evaluationId,
      user_id: domain.userId,
      evaluator_role: domain.evaluatorRole,
      assigned_at: domain.assignedAt,
      completed_at: domain.completedAt,
      notes: domain.notes,
    };
  }

  static toDomainArray(orms: CognitiveEvaluatorOrmEntity[]): CognitiveEvaluator[] {
    return orms.map(orm => this.toDomain(orm));
  }
}