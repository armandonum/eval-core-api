import { FlowEvaluation } from '../../domain/entities/flow-evaluation.entity';
import { FlowEvaluationTypeormEntity } from './flow-evaluation.typeorm.entity';

export class FlowEvaluationMapper {

  static toDomain(
    entity: FlowEvaluationTypeormEntity,
  ): FlowEvaluation {

    return new FlowEvaluation(
      entity.evaluation_id,
      entity.session_id,
      entity.flow_id,
      entity.pasos_totales,
      entity.pasos_completados,
      entity.fallos,
      entity.completado,
      entity.tiempo_total_ms,
      entity.created_at,
    );
  }

  static toPersistence(
    domain: FlowEvaluation,
  ): FlowEvaluationTypeormEntity {

    const entity =
      new FlowEvaluationTypeormEntity();

    entity.evaluation_id = domain.evaluationId;
    entity.session_id = domain.sessionId;
    entity.flow_id = domain.flowId;
    entity.pasos_totales = domain.totalSteps;
    entity.pasos_completados = domain.completedSteps;
    entity.fallos = domain.failures;
    entity.completado = domain.completed;
    entity.tiempo_total_ms = domain.totalTimeMs;

    return entity;
  }

  static toDomainList(
    entities: FlowEvaluationTypeormEntity[],
  ): FlowEvaluation[] {

    return entities.map(
      this.toDomain,
    );
  }

}