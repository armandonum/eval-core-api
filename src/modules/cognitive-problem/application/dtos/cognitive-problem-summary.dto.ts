import { ApiProperty } from '@nestjs/swagger';

import { CognitiveProblemResponseDto } from './cognitive-problem-response.dto';

export class TaskProblemCount {
  @ApiProperty({
    description: 'Identificador de la tarea',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  taskId: string;

  @ApiProperty({
    description: 'Título de la tarea',
    example: 'Buscar un destino turístico',
  })
  taskTitle: string;

  @ApiProperty({
    description: 'Cantidad de problemas asociados a la tarea',
    example: 5,
  })
  problemCount: number;

  @ApiProperty({
    description: 'Cantidad de problemas críticos asociados a la tarea',
    example: 2,
  })
  criticalCount: number;
}

export class CognitiveProblemSummaryDto {
  @ApiProperty({
    description: 'Identificador de la evaluación cognitiva',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  evaluationId: string;

  @ApiProperty({
    description: 'Cantidad total de problemas identificados',
    example: 20,
  })
  totalProblems: number;

  @ApiProperty({
    description: 'Distribución de problemas según su severidad',
    example: {
      critical: 2,
      high: 5,
      medium: 8,
      low: 5,
    },
  })
  bySeverity: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };

  @ApiProperty({
    description: 'Distribución de problemas según su categoría',
    example: {
      design: 4,
      functionality: 3,
      navigation: 3,
      content: 2,
      performance: 1,
      accessibility: 2,
      usability: 4,
      other: 1,
    },
  })
  byCategory: {
    design: number;
    functionality: number;
    navigation: number;
    content: number;
    performance: number;
    accessibility: number;
    usability: number;
    other: number;
  };

  @ApiProperty({
    description: 'Distribución de problemas según su estado',
    example: {
      identified: 8,
      analyzing: 5,
      resolved: 6,
      rejected: 1,
    },
  })
  byStatus: {
    identified: number;
    analyzing: number;
    resolved: number;
    rejected: number;
  };

  @ApiProperty({
    description: 'Cantidad de problemas activos',
    example: 13,
  })
  activeProblems: number;

  @ApiProperty({
    description: 'Cantidad de problemas resueltos',
    example: 6,
  })
  resolvedProblems: number;

  @ApiProperty({
    description: 'Porcentaje de problemas resueltos',
    example: 30,
    minimum: 0,
    maximum: 100,
  })
  resolutionRate: number;

  @ApiProperty({
    description: 'Lista de problemas principales',
    type: [CognitiveProblemResponseDto],
  })
  topProblems: CognitiveProblemResponseDto[];

  @ApiProperty({
    description: 'Tareas más afectadas por problemas',
    type: [TaskProblemCount],
  })
  mostAffectedTasks: TaskProblemCount[];
}