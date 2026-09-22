import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CognitiveEvaluatorResponseDto {
  @ApiProperty({
    description: 'Identificador de la asignación del evaluador',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Identificador de la evaluación cognitiva',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  evaluationId: string;

  @ApiProperty({
    description: 'Identificador del usuario evaluador',
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  userId: string;

  @ApiPropertyOptional({
    description: 'Nombre completo del usuario evaluador',
    example: 'Juan Pérez',
  })
  userFullName?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico del usuario evaluador',
    example: 'juan.perez@example.com',
  })
  userEmail?: string;

  @ApiProperty({
    description: 'Rol del evaluador',
    example: 'evaluator',
  })
  evaluatorRole: string;

  @ApiProperty({
    description: 'Fecha en la que fue asignado el evaluador',
    example: '2026-08-13T10:00:00.000Z',
  })
  assignedAt: Date;

  @ApiProperty({
    description: 'Fecha en la que el evaluador completó la evaluación',
    nullable: true,
    example: '2026-08-13T11:30:00.000Z',
  })
  completedAt: Date | null;

  @ApiProperty({
    description: 'Notas asociadas al evaluador',
    nullable: true,
    example: 'Evaluador principal de la sesión.',
  })
  notes: string | null;




  @ApiPropertyOptional({
    description: 'Indica si el evaluador completó la evaluación',
    example: true,
  })
  hasCompleted?: boolean;

  @ApiPropertyOptional({
    description: 'Porcentaje de tareas completadas por el evaluador',
    example: 75,
    minimum: 0,
    maximum: 100,
  })
  progress?: number;
}