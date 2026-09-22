import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EvaluatorProgressDto {
  @ApiProperty({
    description: 'Identificador del evaluador',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  evaluatorId: string;

  @ApiProperty({
    description: 'Identificador del usuario evaluador',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  userId: string;

  @ApiProperty({
    description: 'Nombre completo del evaluador',
    example: 'Juan Pérez',
  })
  userFullName: string;

  @ApiProperty({
    description: 'Identificador de la evaluación cognitiva',
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  evaluationId: string;

  @ApiProperty({
    description: 'Cantidad total de tareas de la evaluación',
    example: 10,
  })
  totalTasks: number;

  @ApiProperty({
    description: 'Cantidad de tareas completadas',
    example: 6,
  })
  completedTasks: number;

  @ApiProperty({
    description: 'Cantidad de tareas pendientes',
    example: 2,
  })
  pendingTasks: number;

  @ApiProperty({
    description: 'Cantidad de tareas actualmente en progreso',
    example: 1,
  })
  inProgressTasks: number;

  @ApiProperty({
    description: 'Cantidad de tareas fallidas',
    example: 1,
  })
  failedTasks: number;

  @ApiProperty({
    description: 'Porcentaje de progreso del evaluador',
    example: 60,
    minimum: 0,
    maximum: 100,
  })
  progressPercentage: number;

  @ApiPropertyOptional({
    description: 'Tiempo estimado restante para completar las tareas, en minutos',
    example: 15,
  })
  estimatedTimeRemaining?: number;
}