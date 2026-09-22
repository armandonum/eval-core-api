import { HeuristicEvaluator, EvaluatorRole } from '../../domain/entities/heuristic-evaluator.entity';
import { HeuristicEvaluatorTypeorm } from './heuristic-evaluator.typeorm.entity';

export class HeuristicEvaluatorMapper {
  static toDomain(typeorm: HeuristicEvaluatorTypeorm): HeuristicEvaluator {
    return new HeuristicEvaluator(
      typeorm.id,
      typeorm.evaluation_id,
      typeorm.user_id,
      typeorm.role as EvaluatorRole,
      typeorm.assigned_at,
      typeorm.completed_at,
      typeorm.notes,
      typeorm.created_at,
      typeorm.updated_at,
    );
  }

  static toTypeorm(domain: HeuristicEvaluator): HeuristicEvaluatorTypeorm {
    const typeorm = new HeuristicEvaluatorTypeorm();
    if (domain.id) typeorm.id = domain.id;
    typeorm.evaluation_id = domain.evaluationId;
    typeorm.user_id = domain.userId;
    typeorm.role = domain.role;
    typeorm.assigned_at = domain.assignedAt;
    typeorm.completed_at = domain.completedAt;
    typeorm.notes = domain.notes;
    typeorm.created_at = domain.createdAt;
    typeorm.updated_at = domain.updatedAt;
    return typeorm;
  }
}