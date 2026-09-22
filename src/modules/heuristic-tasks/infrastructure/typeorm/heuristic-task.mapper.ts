import { HeuristicTask, TaskStatus } from '../../domain/entities/heuristic-task.entity';
import { HeuristicTaskTypeorm } from './heuristic-task.typeorm.entity';

export class HeuristicTaskMapper {
  static toDomain(typeorm: HeuristicTaskTypeorm): HeuristicTask {
    return new HeuristicTask(
      typeorm.id,
      typeorm.evaluation_id,
      typeorm.project_task_id,
      typeorm.title,
      typeorm.description,
      typeorm.user_goal,
      typeorm.order_index,
      typeorm.status as TaskStatus,
      typeorm.created_at,
      typeorm.updated_at,
    );
  }

  static toTypeorm(domain: HeuristicTask): HeuristicTaskTypeorm {
    const typeorm = new HeuristicTaskTypeorm();
    if (domain.id) typeorm.id = domain.id;
    typeorm.evaluation_id = domain.evaluationId;
    typeorm.project_task_id = domain.projectTaskId;
    typeorm.title = domain.title;
    typeorm.description = domain.description;
    typeorm.user_goal = domain.userGoal;
    typeorm.order_index = domain.orderIndex;
    typeorm.status = domain.status;
    typeorm.created_at = domain.createdAt;
    typeorm.updated_at = domain.updatedAt;
    return typeorm;
  }
}