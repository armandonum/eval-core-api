import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CognitiveProblemResponseDto {
  @ApiProperty({
    description: 'Identificador del problema',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Identificador de la evaluación cognitiva',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  evaluationId: string;

  @ApiProperty({
    description: 'Título del problema',
    example: 'El usuario no identifica el botón principal',
  })
  title: string;

  @ApiProperty({
    description: 'Descripción detallada del problema',
    example:
      'El usuario presenta dificultades para localizar la acción principal.',
  })
  description: string;

  @ApiProperty({
    description: 'Nivel de severidad del problema',
    example: 'high',
  })
  severity: string;

  @ApiProperty({
    description: 'Categoría del problema',
    nullable: true,
    example: 'usability',
  })
  category: string | null;

  @ApiProperty({
    description: 'Identificador del usuario que reportó el problema',
    nullable: true,
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  reportedBy: string | null;

  @ApiPropertyOptional({
    description: 'Nombre del usuario que reportó el problema',
    example: 'Juan Pérez',
  })
  reportedByName?: string;

  @ApiProperty({
    description: 'Identificadores de las tareas afectadas',
    type: [String],
    example: [
      '550e8400-e29b-41d4-a716-446655440003',
    ],
  })
  affectedTasks: string[];

  @ApiPropertyOptional({
    description: 'Títulos de las tareas afectadas',
    type: [String],
    example: [
      'Buscar destino',
      'Consultar información',
    ],
  })
  affectedTaskTitles?: string[];

  @ApiProperty({
    description: 'Estado actual del problema',
    example: 'identified',
  })
  status: string;

  @ApiProperty({
    description: 'Notas relacionadas con la resolución',
    nullable: true,
    example: 'Se recomienda aumentar el contraste del botón.',
  })
  resolutionNotes: string | null;

  @ApiProperty({
    description: 'Fecha de creación',
    example: '2026-08-13T10:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización',
    example: '2026-08-13T11:00:00.000Z',
  })
  updatedAt: Date;

  @ApiPropertyOptional({
    description: 'Indica si el problema es crítico',
    example: false,
  })
  isCritical?: boolean;

  @ApiPropertyOptional({
    description: 'Indica si el problema tiene prioridad alta',
    example: true,
  })
  isHighPriority?: boolean;

  @ApiPropertyOptional({
    description: 'Indica si el problema continúa activo',
    example: true,
  })
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Puntuación numérica de severidad',
    example: 4,
  })
  severityScore?: number;
}