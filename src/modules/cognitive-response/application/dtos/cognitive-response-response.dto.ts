import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CognitiveResponseResponseDto {
  @ApiProperty({
    description: 'Identificador de la respuesta cognitiva',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Identificador de la evaluación',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  evaluationId: string;

  @ApiProperty({
    description: 'Identificador del evaluador',
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  evaluatorId: string;

  @ApiProperty({
    description: 'Identificador de la tarea',
    example: '550e8400-e29b-41d4-a716-446655440003',
  })
  taskId: string;

  @ApiPropertyOptional({
    description: 'Título de la tarea',
    example: 'Buscar un destino turístico',
  })
  taskTitle?: string;

  @ApiProperty({
    description: 'Identificador de la acción',
    nullable: true,
    example: '550e8400-e29b-41d4-a716-446655440004',
  })
  actionId: string | null;

  @ApiProperty({
    description: 'Descripción de la respuesta',
    nullable: true,
  })
  responseDescription: string | null;

  @ApiProperty({
    description: 'Respuesta observada del sistema',
    nullable: true,
  })
  systemResponse: string | null;

  @ApiProperty({
    description: 'Respuesta a la pregunta cognitiva 1',
    nullable: true,
  })
  q1WillUserTryCorrectOutcome: string | null;

  @ApiProperty({
    description: 'Justificación de la pregunta 1',
    nullable: true,
  })
  q1Reasoning: string | null;

  @ApiProperty({
    description: 'Respuesta a la pregunta cognitiva 2',
    nullable: true,
  })
  q2WillUserNoticeAction: string | null;

  @ApiProperty({
    description: 'Justificación de la pregunta 2',
    nullable: true,
  })
  q2Reasoning: string | null;

  @ApiProperty({
    description: 'Respuesta a la pregunta cognitiva 3',
    nullable: true,
  })
  q3WillUserAssociateAction: string | null;

  @ApiProperty({
    description: 'Justificación de la pregunta 3',
    nullable: true,
  })
  q3Reasoning: string | null;

  @ApiProperty({
    description: 'Respuesta a la pregunta cognitiva 4',
    nullable: true,
  })
  q4WillUserSeeProgress: string | null;

  @ApiProperty({
    description: 'Justificación de la pregunta 4',
    nullable: true,
  })
  q4Reasoning: string | null;

  @ApiProperty({
    description: 'Problema identificado',
    nullable: true,
  })
  problemIdentified: string | null;

  @ApiProperty({
    description: 'Sugerencia de diseño',
    nullable: true,
  })
  designSuggestion: string | null;

  @ApiProperty({
    description: 'Comentarios adicionales',
    nullable: true,
  })
  otherComments: string | null;

  @ApiProperty({
    description: 'Tiempo empleado en segundos',
    nullable: true,
    example: 45,
  })
  timeSpentSeconds: number | null;

  @ApiProperty({
    description: 'Indica si la tarea fue exitosa',
    nullable: true,
    example: true,
  })
  success: boolean | null;

  @ApiProperty({
    description: 'Estado de la respuesta',
    example: 'completed',
  })
  status: string;

  @ApiProperty({
    description: 'Fecha de creación',
    example: '2026-08-13T10:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización',
    example: '2026-08-13T10:30:00.000Z',
  })
  updatedAt: Date;

  @ApiPropertyOptional({
    description: 'Indica si la respuesta contiene problemas identificados',
    example: true,
  })
  hasIssues?: boolean;

  @ApiPropertyOptional({
    description: 'Cantidad de problemas identificados',
    example: 2,
  })
  issueCount?: number;

  @ApiPropertyOptional({
    description: 'Resumen de las respuestas dadas',
    example: '3 respuestas positivas y 1 respuesta negativa',
  })
  answerSummary?: string;
}