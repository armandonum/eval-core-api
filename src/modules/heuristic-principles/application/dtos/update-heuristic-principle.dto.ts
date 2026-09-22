import { PartialType } from '@nestjs/mapped-types';
import { CreateHeuristicPrincipleDto } from './create-heuristic-principle.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateHeuristicPrincipleDto extends PartialType(CreateHeuristicPrincipleDto) {
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}