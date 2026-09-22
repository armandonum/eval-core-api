import { PartialType } from '@nestjs/mapped-types';
import { CreateHeuristicFrameworkDto } from './create-heuristic-framework.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateHeuristicFrameworkDto extends PartialType(CreateHeuristicFrameworkDto) {
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}