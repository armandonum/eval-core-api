import { HeuristicPositiveAspect } from '../../domain/entities/heuristic-positive-aspect.entity';
import { HeuristicPositiveAspectTypeorm } from './heuristic-positive-aspect.typeorm.entity';

export class HeuristicPositiveAspectMapper {
  static toDomain(typeorm: HeuristicPositiveAspectTypeorm): HeuristicPositiveAspect {
    return new HeuristicPositiveAspect(
      typeorm.aspect_id,
      typeorm.session_id,
      typeorm.evaluation_id,
      typeorm.evaluator_id,
      typeorm.task_id,
      typeorm.description,
      typeorm.created_at,
    );
  }

  static toTypeorm(domain: HeuristicPositiveAspect): HeuristicPositiveAspectTypeorm {
    const typeorm = new HeuristicPositiveAspectTypeorm();
    if (domain.aspectId) typeorm.aspect_id = domain.aspectId;
    typeorm.session_id = domain.sessionId;
    typeorm.evaluation_id = domain.evaluationId;
    typeorm.evaluator_id = domain.evaluatorId;
    typeorm.task_id = domain.taskId;
    typeorm.description = domain.description;
    typeorm.created_at = domain.createdAt;
    return typeorm;
  }
}