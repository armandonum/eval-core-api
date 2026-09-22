import { PartialType } from '@nestjs/mapped-types';
import { CreateHeuristicEvaluationDto } from './create-heuristic-evaluation.dto';

export class UpdateHeuristicEvaluationDto extends PartialType(
  CreateHeuristicEvaluationDto,
) {}