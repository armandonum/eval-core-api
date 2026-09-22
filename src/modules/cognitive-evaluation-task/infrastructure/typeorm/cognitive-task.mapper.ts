// infrastructure/typeorm/cognitive-task.mapper.ts
import { CognitiveTask } from '../../domain/entities/cognitive-task.entity';
import { CognitiveTaskOrmEntity } from './cognitive-task.orm-entity';
import { CognitiveTaskStatus } from '../../domain/enums/cognitive-task-status.enum';

export class CognitiveTaskMapper {
  static toDomain(orm: CognitiveTaskOrmEntity): CognitiveTask {
    return new CognitiveTask(
      orm.id,
      orm.evaluation_id,
      orm.project_task_id,
      orm.title,
      orm.description,
      orm.user_goal,
      orm.order_index,
      orm.status,
      orm.created_at,
      orm.updated_at,
    );
  }

  static toPersistence(domain: CognitiveTask): Partial<CognitiveTaskOrmEntity> {
    return {
      id: domain.id,
      evaluation_id: domain.evaluationId,
      project_task_id: domain.projectTaskId,
      title: domain.title,
      description: domain.description,
      user_goal: domain.userGoal,
      order_index: domain.orderIndex,
      status: domain.status,
      created_at: domain.createdAt,
      updated_at: domain.updatedAt,
    };
  }

  static toDomainArray(orms: CognitiveTaskOrmEntity[]): CognitiveTask[] {
    return orms.map(orm => this.toDomain(orm));
  }
}