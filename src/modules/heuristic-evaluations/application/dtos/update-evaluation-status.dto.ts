import { IsEnum, IsNotEmpty } from 'class-validator';
import { EvaluationStatus } from '../../domain/entities/heuristic-evaluation.entity';

export class UpdateEvaluationStatusDto {
  @IsEnum(['draft', 'planning', 'in_progress', 'completed', 'archived'])
  @IsNotEmpty()
  status: EvaluationStatus;
}