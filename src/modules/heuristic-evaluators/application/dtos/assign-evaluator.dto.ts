import { IsString, IsOptional, IsNotEmpty, IsUUID, IsEnum } from 'class-validator';
import { EvaluatorRole } from '../../domain/entities/heuristic-evaluator.entity';

export class AssignEvaluatorDto {
  @IsUUID()
  @IsNotEmpty()
  evaluationId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsEnum(['supervisor', 'evaluator', 'observer'])
  @IsOptional()
  role?: EvaluatorRole;

  @IsString()
  @IsOptional()
  notes?: string;
}