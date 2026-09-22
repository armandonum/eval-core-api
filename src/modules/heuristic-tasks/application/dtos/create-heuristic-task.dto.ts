import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsUUID,
  IsInt,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateHeuristicTaskDto {
  @IsUUID()
  @IsNotEmpty()
  evaluationId: string;

  @IsUUID()
  @IsOptional()
  projectTaskId?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  userGoal?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  orderIndex?: number;
}