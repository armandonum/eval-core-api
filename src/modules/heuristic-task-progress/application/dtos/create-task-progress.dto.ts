import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsUUID,
  IsEnum,
} from 'class-validator';

export type TaskProgressStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

export class CreateTaskProgressDto {
  @IsUUID()
  @IsNotEmpty()
  evaluatorId: string;

  @IsUUID()
  @IsNotEmpty()
  taskId: string;

  @IsUUID()
  @IsNotEmpty()
  evaluationId: string;

  @IsUUID()
  @IsOptional()
  sessionId?: string;

  @IsEnum(['pending', 'in_progress', 'completed', 'failed'])
  @IsOptional()
  status?: TaskProgressStatus;
}