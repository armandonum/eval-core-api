import { IsInt, IsOptional, Min, Max } from 'class-validator';

export class UpdateHeuristicRatingDto {
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  severity?: number;

  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  frequency?: number;
}