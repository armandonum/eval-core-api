import { PartialType } from '@nestjs/swagger';
import { CreateFlowEvaluationDto } from './create-flow-evaluation.dto';

export class UpdateFlowEvaluationDto extends PartialType(
  CreateFlowEvaluationDto,
) {}