import { Task } from '../../domain/entities/task.entity';
import { TaskTypeormEntity } from './task.typeorm.entity';

export class TaskMapper {

  static toDomain(
    entity: TaskTypeormEntity,
  ): Task {

    return new Task(
      entity.task_id,
      entity.project_id,
      entity.title,
      entity.description,
      entity.requirement_id,
      entity.order_index,
      entity.created_at,
    );
  }

  static toPersistence(
    domain: Task,
  ): TaskTypeormEntity {

    const entity = new TaskTypeormEntity();

    entity.task_id = domain.taskId;
    entity.project_id = domain.projectId;
    entity.title = domain.title;
    entity.description = domain.description;
    entity.requirement_id = domain.requirementId;
    entity.order_index = domain.orderIndex;
    entity.created_at = domain.createdAt;

    return entity;
  }

  static toDomainList(
    entities: TaskTypeormEntity[],
  ): Task[] {
    return entities.map(this.toDomain);
  }
}