import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CognitiveEvaluationResponseDto {
  @ApiProperty({
    description: 'Identificador de la evaluación cognitiva',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  cognitiveEvaluationId: string;

  @ApiProperty({
    description: 'Identificador del proyecto',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  projectId: string;

  @ApiProperty({
    description: 'Nombre de la evaluación',
    example: 'Evaluación cognitiva de usabilidad',
  })
  name: string;

  @ApiProperty({
    description: 'Descripción de la evaluación',
    nullable: true,
    example: 'Evaluación para analizar la carga cognitiva',
  })
  description: string | null;

  @ApiProperty({
    description: 'Identificador del supervisor',
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  supervisorId: string;

  @ApiProperty({
    description: 'Estado de la evaluación',
    example: 'active',
  })
  status: string;

  @ApiProperty({
    description: 'Duración máxima de la evaluación en minutos',
    example: 30,
  })
  maxDurationMinutes: number;

  @ApiProperty({
    description: 'Descripción del usuario objetivo',
    nullable: true,
    example: 'Usuarios entre 18 y 35 años',
  })
  targetUserDescription: string | null;

  @ApiProperty({
    description: 'Descripción del sistema evaluado',
    nullable: true,
    example: 'Plataforma web de turismo',
  })
  systemDescription: string | null;

  @ApiProperty({
    description: 'Fecha de inicio de la evaluación',
    nullable: true,
    example: '2026-08-12T10:00:00.000Z',
  })
  startedAt: Date | null;

  @ApiProperty({
    description: 'Fecha de finalización de la evaluación',
    nullable: true,
    example: '2026-08-12T10:30:00.000Z',
  })
  completedAt: Date | null;

  @ApiProperty({
    description: 'Fecha de creación',
    example: '2026-08-12T09:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización',
    example: '2026-08-12T09:30:00.000Z',
  })
  updatedAt: Date;

  @ApiPropertyOptional({
    description: 'Cantidad total de tareas asociadas',
    example: 10,
  })
  totalTasks?: number;

  @ApiPropertyOptional({
    description: 'Cantidad total de evaluadores',
    example: 5,
  })
  totalEvaluators?: number;

  @ApiPropertyOptional({
    description: 'Porcentaje de progreso de la evaluación',
    example: 75,
    minimum: 0,
    maximum: 100,
  })
  progress?: number;

  @ApiPropertyOptional({
    description: 'Indica si la evaluación se encuentra activa',
    example: true,
  })
  isActive?: boolean;
}