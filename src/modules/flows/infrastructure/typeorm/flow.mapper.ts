import { Flow } from '../../domain/entities/flow.entity';
import { FlowTypeormEntity } from './flow.typeorm.entity';

export class FlowMapper {
  static toDomain(entity: FlowTypeormEntity): Flow {
    return new Flow(
      entity.flow_id,
      entity.task_id,
      entity.project_id,
      entity.name,
      entity.status,
      entity.started_at,
      entity.finished_at,
    );
  }

  static toPersistence(domain: Flow): FlowTypeormEntity {
    const entity = new FlowTypeormEntity();

    entity.flow_id = domain.flowId;
    entity.task_id = domain.taskId;
    entity.project_id = domain.projectId;
    entity.name = domain.name;
    entity.status = domain.status;
    entity.started_at = domain.startedAt;
    entity.finished_at = domain.finishedAt;

    return entity;
  }

  static toDomainList(entities: FlowTypeormEntity[]): Flow[] {
    return entities.map((entity) => this.toDomain(entity));
  }
}