import { Task } from '../entities/task.entity';

export interface TaskRepository {

  create(
    task: Task,
  ): Promise<Task>;

  findById(
    taskId: string,
  ): Promise<Task | null>;

  findAll(): Promise<Task[]>;

  update(
    task: Task,
  ): Promise<Task>;

  delete(
    taskId: string,
  ): Promise<void>;

  findByRequirement(
    requirementId: string
  ): Promise<Task[]>;


  findByProjectId(
    projectId: string
  ): Promise<Task[]>;
}