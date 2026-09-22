import { IsString, IsOptional, IsEnum } from 'class-validator';
import { EvaluatorRole } from '../../domain/entities/heuristic-evaluator.entity';

export class UpdateEvaluatorDto {
  @IsEnum(['supervisor', 'evaluator', 'observer'])
  @IsOptional()
  role?: EvaluatorRole;

  @IsString()
  @IsOptional()
  notes?: string;
}