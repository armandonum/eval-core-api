import { HeuristicEvaluation, EvaluationStatus } from '../../domain/entities/heuristic-evaluation.entity';
import { HeuristicEvaluationTypeorm } from './heuristic-evaluation.typeorm.entity';

export class HeuristicEvaluationMapper {
  static toDomain(typeorm: HeuristicEvaluationTypeorm): HeuristicEvaluation {
    return new HeuristicEvaluation(
      typeorm.evaluation_id,
      typeorm.project_id,
      typeorm.framework_id,
      typeorm.supervisor_id,
      typeorm.name,
      typeorm.description,
      typeorm.status as EvaluationStatus,
      typeorm.system_description,
      typeorm.target_user_description,
      typeorm.max_duration_minutes,
      typeorm.started_at,
      typeorm.completed_at,
      typeorm.created_at,
      typeorm.updated_at,
    );
  }

  static toTypeorm(domain: HeuristicEvaluation): HeuristicEvaluationTypeorm {
    const typeorm = new HeuristicEvaluationTypeorm();
    if (domain.evaluationId) typeorm.evaluation_id = domain.evaluationId;
    typeorm.project_id = domain.projectId;
    typeorm.framework_id = domain.frameworkId;
    typeorm.supervisor_id = domain.supervisorId;
    typeorm.name = domain.name;
    typeorm.description = domain.description;
    typeorm.status = domain.status;
    typeorm.system_description = domain.systemDescription;
    typeorm.target_user_description = domain.targetUserDescription;
    typeorm.max_duration_minutes = domain.maxDurationMinutes;
    typeorm.started_at = domain.startedAt;
    typeorm.completed_at = domain.completedAt;
    typeorm.created_at = domain.createdAt;
    typeorm.updated_at = domain.updatedAt;
    return typeorm;
  }
}