import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../../domain/entities/heuristic-task.entity';

export class UpdateTaskStatusDto {
  @IsEnum(['pending', 'in_progress', 'completed', 'failed'])
  @IsNotEmpty()
  status: TaskStatus;
}