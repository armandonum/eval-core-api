import { PartialType } from '@nestjs/mapped-types';
import { CreateHeuristicTaskDto } from './create-heuristic-task.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../../domain/entities/heuristic-task.entity';

export class UpdateHeuristicTaskDto extends PartialType(CreateHeuristicTaskDto) {
  @IsEnum(['pending', 'in_progress', 'completed', 'failed'])
  @IsOptional()
  status?: TaskStatus;
}