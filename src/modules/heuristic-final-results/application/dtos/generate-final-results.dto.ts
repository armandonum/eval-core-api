import { IsUUID, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';

export class GenerateFinalResultsDto {
  @IsUUID()
  @IsNotEmpty()
  evaluationId: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  totalEvaluators?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  completedEvaluators?: number;
}