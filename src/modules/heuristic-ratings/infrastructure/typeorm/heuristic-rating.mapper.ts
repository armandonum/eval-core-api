import { HeuristicRating } from '../../domain/entities/heuristic-rating.entity';
import { HeuristicRatingTypeorm } from './heuristic-rating.typeorm.entity';

export class HeuristicRatingMapper {
  static toDomain(typeorm: HeuristicRatingTypeorm): HeuristicRating {
    return new HeuristicRating(
      typeorm.rating_id,
      typeorm.evaluation_id,
      typeorm.session_id,
      typeorm.evaluator_id,
      typeorm.problem_id,
      typeorm.severity,
      typeorm.frequency,
      typeorm.criticality,
      typeorm.created_at,
      typeorm.updated_at,
    );
  }

  static toTypeorm(domain: HeuristicRating): HeuristicRatingTypeorm {
    const typeorm = new HeuristicRatingTypeorm();
    if (domain.ratingId) typeorm.rating_id = domain.ratingId;
    typeorm.evaluation_id = domain.evaluationId;
    typeorm.session_id = domain.sessionId;
    typeorm.evaluator_id = domain.evaluatorId;
    typeorm.problem_id = domain.problemId;
    typeorm.severity = domain.severity;
    typeorm.frequency = domain.frequency;
    // criticality es generado automáticamente por la BD
    typeorm.created_at = domain.createdAt;
    typeorm.updated_at = domain.updatedAt;
    return typeorm;
  }
}