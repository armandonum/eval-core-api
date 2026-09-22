import {
  HeuristicObservation,
  ObservationFrequency,
} from '../../domain/entities/heuristic-observation.entity';
import { HeuristicObservationTypeorm } from './heuristic-observation.typeorm.entity';

export class HeuristicObservationMapper {
  static toDomain(typeorm: HeuristicObservationTypeorm): HeuristicObservation {
    return new HeuristicObservation(
      typeorm.observation_id,
      typeorm.session_id,
      typeorm.evaluation_id,
      typeorm.evaluator_id,
      typeorm.task_id,
      typeorm.principle_id,
      typeorm.description,
      typeorm.severity,
      typeorm.frequency as ObservationFrequency,
      typeorm.recommendation,
      typeorm.node_id,
      typeorm.screen_identifier,
      typeorm.created_at,
      typeorm.updated_at,
    );
  }

  static toTypeorm(domain: HeuristicObservation): HeuristicObservationTypeorm {
    const typeorm = new HeuristicObservationTypeorm();
    if (domain.observationId) typeorm.observation_id = domain.observationId;
    typeorm.session_id = domain.sessionId;
    typeorm.evaluation_id = domain.evaluationId;
    typeorm.evaluator_id = domain.evaluatorId;
    typeorm.task_id = domain.taskId;
    typeorm.principle_id = domain.principleId;
    typeorm.description = domain.description;
    typeorm.severity = domain.severity;
    typeorm.frequency = domain.frequency;
    typeorm.recommendation = domain.recommendation;
    typeorm.node_id = domain.nodeId;
    typeorm.screen_identifier = domain.screenIdentifier;
    typeorm.created_at = domain.createdAt;
    typeorm.updated_at = domain.updatedAt;
    return typeorm;
  }
}