// application/dtos/finding-response.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { FindingType } from '../../domain/enums/finding-type.enum';
import { FindingSeverity } from '../../domain/enums/finding-severity.enum';
import { FindingStatus } from '../../domain/enums/finding-status.enum';

export class FindingResponseDto {
  @ApiProperty({
    description: 'ID del hallazgo',
    format: 'uuid',
  })
  findingId: string;

  @ApiProperty({
    description: 'ID de la evaluación',
    format: 'uuid',
  })
  evaluationId: string;

  @ApiProperty({
    description: 'ID de la sesión',
    format: 'uuid',
    nullable: true,
  })
  sessionId: string | null;

  @ApiProperty({
    description: 'ID de la tarea',
    format: 'uuid',
    nullable: true,
  })
  taskId: string | null;

  @ApiProperty({
    description: 'ID del requerimiento',
    format: 'uuid',
    nullable: true,
  })
  requirementId: string | null;

  @ApiProperty({
    description: 'ID del flujo',
    format: 'uuid',
    nullable: true,
  })
  flowId: string | null;

  @ApiProperty({
    description: 'ID del nodo Figma',
    nullable: true,
  })
  nodeId: string | null;

  @ApiProperty({
    description: 'Versión del prototipo',
    nullable: true,
  })
  version: string | null;

  @ApiProperty({
    enum: FindingType,
    description: 'Tipo de hallazgo',
  })
  type: FindingType;

  @ApiProperty({
    description: 'Descripción del hallazgo',
  })
  description: string;

  @ApiProperty({
    enum: FindingSeverity,
    description: 'Severidad del hallazgo',
  })
  severity: FindingSeverity;

  @ApiProperty({
    description: 'Frecuencia del hallazgo',
    example: 5,
  })
  frequency: number;

  @ApiProperty({
    description: 'Impacto del hallazgo',
  })
  impact: string;

  @ApiProperty({
    description: 'Prioridad del hallazgo',
  })
  priority: string;

  @ApiProperty({
    description: 'Recomendación',
    nullable: true,
  })
  recommendation: string | null;

  @ApiProperty({
    enum: FindingStatus,
    description: 'Estado del hallazgo',
  })
  status: FindingStatus;

  @ApiProperty({
    description: 'Emoción inferida por IA',
    nullable: true,
  })
  emotionInferred: string | null;

  @ApiProperty({
    description: 'Sentimiento textual detectado',
    nullable: true,
  })
  textualSentiment: string | null;

  @ApiProperty({
    description: 'Comentario realizado por el usuario',
    nullable: true,
  })
  userComment: string | null;

  @ApiProperty({
    description: 'Comentario realizado por el experto',
    nullable: true,
  })
  expertComment: string | null;

  @ApiProperty({
    description: 'Orígenes de los hallazgos agregados',
    type: [String],
  })
  aggregatedFrom: string[];

  @ApiProperty({
    description: 'Número de ocurrencias',
    example: 3,
  })
  occurrences: number;

  @ApiProperty({
    description: 'Fecha de creación',
    type: String,
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de actualización',
    type: String,
    format: 'date-time',
  })
  updatedAt: Date;

  // Campos calculados

  @ApiPropertyOptional({
    description: 'Indica si el hallazgo es crítico',
    example: true,
  })
  isCritical?: boolean;

  @ApiPropertyOptional({
    description: 'Indica si el hallazgo está activo',
    example: true,
  })
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Puntuación calculada de severidad',
    example: 8.5,
  })
  severityScore?: number;
}