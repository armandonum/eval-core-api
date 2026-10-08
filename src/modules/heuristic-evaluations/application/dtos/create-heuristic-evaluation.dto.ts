import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsUUID,
  IsInt,
  Min,
  Max,
  MaxLength,
} from 'class-validator';
import { EvaluationStatus } from '../../domain/entities/heuristic-evaluation.entity';

export class CreateHeuristicEvaluationDto {
  @IsUUID()
  @IsNotEmpty()
  projectId: string;

  @IsUUID()
  @IsNotEmpty()
  frameworkId: string;

  @IsUUID()
  @IsNotEmpty()
  supervisorId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  systemDescription?: string;

  @IsString()
  @IsOptional()
  targetUserDescription?: string;

  @IsInt()
  @Min(1)
  @Max(180)
  @IsOptional()
  maxDurationMinutes?: number;

  @IsOptional()
    status: EvaluationStatus;
}