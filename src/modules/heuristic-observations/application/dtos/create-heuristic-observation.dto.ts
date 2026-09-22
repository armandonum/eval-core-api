import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsUUID,
  IsInt,
  Min,
  Max,
  IsEnum,
} from 'class-validator';
import { ObservationFrequency } from '../../domain/entities/heuristic-observation.entity';

export class CreateHeuristicObservationDto {
  @IsUUID()
  @IsNotEmpty()
  sessionId: string;

  @IsUUID()
  @IsNotEmpty()
  evaluationId: string;

  @IsUUID()
  @IsNotEmpty()
  evaluatorId: string;

  @IsUUID()
  @IsOptional()
  taskId?: string;

  @IsUUID()
  @IsNotEmpty()
  principleId: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @Min(1)
  @Max(5)
  severity: number;

  @IsEnum(['Siempre', 'Frecuentemente', 'Ocasionalmente', 'Raramente', 'Nunca'])
  frequency: ObservationFrequency;

  @IsString()
  @IsOptional()
  recommendation?: string;

  @IsString()
  @IsOptional()
  nodeId?: string;

  @IsString()
  @IsOptional()
  screenIdentifier?: string;
}