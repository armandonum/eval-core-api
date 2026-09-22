import { IsNotEmpty, IsUUID, IsInt, Min, Max } from 'class-validator';

export class CreateHeuristicRatingDto {
  @IsUUID()
  @IsNotEmpty()
  evaluationId: string;

  @IsUUID()
  @IsNotEmpty()
  sessionId: string;

  @IsUUID()
  @IsNotEmpty()
  evaluatorId: string;

  @IsUUID()
  @IsNotEmpty()
  problemId: string; // observation_id

  @IsInt()
  @Min(1)
  @Max(5)
  severity: number;

  @IsInt()
  @Min(1)
  @Max(10)
  frequency: number;
}