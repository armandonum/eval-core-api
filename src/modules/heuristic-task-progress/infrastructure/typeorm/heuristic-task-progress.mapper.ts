import {
  HeuristicTaskProgress,
  TaskProgressStatus,
} from '../../domain/entities/heuristic-task-progress.entity';
import { HeuristicTaskProgressTypeorm } from './heuristic-task-progress.typeorm.entity';

export class HeuristicTaskProgressMapper {
  static toDomain(typeorm: HeuristicTaskProgressTypeorm): HeuristicTaskProgress {
    return new HeuristicTaskProgress(
      typeorm.progress_id,
      typeorm.evaluator_id,
      typeorm.task_id,
      typeorm.evaluation_id,
      typeorm.session_id,
      typeorm.status as TaskProgressStatus,
      typeorm.started_at,
      typeorm.completed_at,
      typeorm.created_at,
      typeorm.updated_at,
    );
  }

  static toTypeorm(domain: HeuristicTaskProgress): HeuristicTaskProgressTypeorm {
    const typeorm = new HeuristicTaskProgressTypeorm();
    if (domain.progressId) typeorm.progress_id = domain.progressId;
    typeorm.evaluator_id = domain.evaluatorId;
    typeorm.task_id = domain.taskId;
    typeorm.evaluation_id = domain.evaluationId;
    typeorm.session_id = domain.sessionId;
    typeorm.status = domain.status;
    typeorm.started_at = domain.startedAt;
    typeorm.completed_at = domain.completedAt;
    typeorm.created_at = domain.createdAt;
    typeorm.updated_at = domain.updatedAt;
    return typeorm;
  }
}