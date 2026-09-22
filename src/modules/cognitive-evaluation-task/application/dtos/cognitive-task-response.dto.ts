import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CognitiveTaskResponseDto {
  @ApiProperty({
    description: 'Identificador de la tarea cognitiva',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Identificador de la evaluación cognitiva',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  evaluationId: string;

  @ApiProperty({
    description: 'Identificador de la tarea del proyecto asociada',
    nullable: true,
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  projectTaskId: string | null;

  @ApiProperty({
    description: 'Título de la tarea cognitiva',
    example: 'Buscar un destino turístico',
  })
  title: string;

  @ApiProperty({
    description: 'Descripción de la tarea',
    nullable: true,
    example: 'El usuario debe encontrar un destino turístico.',
  })
  description: string | null;

  @ApiProperty({
    description: 'Objetivo que debe alcanzar el usuario',
    nullable: true,
    example: 'Encontrar un destino y consultar su información.',
  })
  userGoal: string | null;

  @ApiProperty({
    description: 'Posición de la tarea dentro de la evaluación',
    example: 1,
  })
  orderIndex: number;

  @ApiProperty({
    description: 'Estado actual de la tarea',
    example: 'pending',
  })
  status: string;

  @ApiProperty({
    description: 'Fecha de creación',
    example: '2026-08-12T10:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización',
    example: '2026-08-12T10:30:00.000Z',
  })
  updatedAt: Date;

  @ApiPropertyOptional({
    description: 'Cantidad total de acciones asociadas a la tarea',
    example: 8,
  })
  actionsCount?: number;

  @ApiPropertyOptional({
    description: 'Cantidad de acciones completadas',
    example: 6,
  })
  completedActions?: number;

  @ApiPropertyOptional({
    description: 'Porcentaje de progreso de la tarea',
    example: 75,
    minimum: 0,
    maximum: 100,
  })
  progress?: number;
}