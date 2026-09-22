import { PartialType } from '@nestjs/mapped-types';
import { CreateHeuristicObservationDto } from './create-heuristic-observation.dto';

export class UpdateHeuristicObservationDto extends PartialType(
  CreateHeuristicObservationDto,
) {}