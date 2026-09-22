// application/dtos/create-finding.dto.ts

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { FindingType } from '../../domain/enums/finding-type.enum';
import { FindingSeverity } from '../../domain/enums/finding-severity.enum';
import { FindingImpact } from '../../domain/enums/finding-impact.enum';
import { FindingPriority } from '../../domain/enums/finding-priority.enum';
import { FindingStatus } from '../../domain/enums/finding-status.enum';

export class CreateFindingDto {
  @ApiProperty({ description: 'ID de la evaluación' })
  @IsUUID()
  evaluationId: string;

  @ApiPropertyOptional({ description: 'ID de la sesión' })
  @IsOptional()
  @IsUUID()
  sessionId?: string;

  @ApiPropertyOptional({ description: 'ID de la tarea' })
  @IsOptional()
  @IsUUID()
  taskId?: string;

  @ApiPropertyOptional({ description: 'ID del requerimiento' })
  @IsOptional()
  @IsUUID()
  requirementId?: string;

  @ApiPropertyOptional({ description: 'ID del flujo' })
  @IsOptional()
  @IsUUID()
  flowId?: string;

  @ApiPropertyOptional({ description: 'ID del nodo Figma' })
  @IsOptional()
  @IsString()
  nodeId?: string;

  @ApiPropertyOptional({ description: 'Versión del prototipo' })
  @IsOptional()
  @IsString()
  version?: string;

  @ApiProperty({
    enum: FindingType,
    description: 'Tipo de hallazgo',
  })
  @IsEnum(FindingType)
  type: FindingType;

  @ApiProperty({
    description: 'Descripción del hallazgo',
  })
  @IsString()
  description: string;

  @ApiProperty({
    enum: FindingSeverity,
    description: 'Severidad',
  })
  @IsEnum(FindingSeverity)
  severity: FindingSeverity;

  @ApiProperty({
    enum: FindingImpact,
    description: 'Impacto',
  })
  @IsEnum(FindingImpact)
  impact: FindingImpact;

  @ApiProperty({
    enum: FindingPriority,
    description: 'Prioridad',
  })
  @IsEnum(FindingPriority)
  priority: FindingPriority;

  @ApiPropertyOptional({
    description: 'Clasificación del hallazgo',
  })
  @IsOptional()
  @IsString()
  class?: string;

  @ApiPropertyOptional({
    description: 'Frecuencia del hallazgo',
    default: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  frequency?: number;

  @ApiPropertyOptional({
    description: 'Recomendación',
  })
  @IsOptional()
  @IsString()
  recommendation?: string;

  @ApiProperty({
    enum: FindingStatus,
    description: 'Estado',
  })
  @IsEnum(FindingStatus)
  status: FindingStatus;

  @ApiPropertyOptional({
    description: 'Emoción inferida',
  })
  @IsOptional()
  @IsString()
  emotionInferred?: string;

  @ApiPropertyOptional({
    description: 'Sentimiento textual',
  })
  @IsOptional()
  @IsString()
  textualSentiment?: string;

  @ApiPropertyOptional({
    description: 'Comentario del usuario',
  })
  @IsOptional()
  @IsString()
  userComment?: string;

  @ApiPropertyOptional({
    description: 'Comentario del experto',
  })
  @IsOptional()
  @IsString()
  expertComment?: string;

  @ApiPropertyOptional({
    description: 'ID del comentario de usuario',
  })
  @IsOptional()
  @IsUUID()
  userCommentId?: string;

  @ApiPropertyOptional({
    description: 'ID del comentario de experto',
  })
  @IsOptional()
  @IsUUID()
  expertCommentId?: string;

  @ApiPropertyOptional({
    description: 'IDs de origen para agregación',
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  aggregatedFrom?: string[];

  @ApiPropertyOptional({
    description: 'Número de ocurrencias',
    default: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  occurrences?: number;
}