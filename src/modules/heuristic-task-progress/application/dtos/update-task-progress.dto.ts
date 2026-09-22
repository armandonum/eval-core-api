import { IsString, IsOptional, IsUUID, IsEnum } from 'class-validator';
import { TaskProgressStatus } from './create-task-progress.dto';

export class UpdateTaskProgressDto {
  @IsEnum(['pending', 'in_progress', 'completed', 'failed'])
  @IsOptional()
  status?: TaskProgressStatus;

  @IsUUID()
  @IsOptional()
  sessionId?: string;
}