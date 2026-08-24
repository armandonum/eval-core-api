import { ApiProperty } from '@nestjs/swagger';

export class TaskIssueSummary {
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
    description: 'Cantidad total de problemas identificados',
    example: 3,
  })
  totalIssues: number;

  @ApiProperty({
    description: 'Problemas asociados a la pregunta 1',
    example: 1,
  })
  q1Issues: number;

  @ApiProperty({
    description: 'Problemas asociados a la pregunta 2',
    example: 1,
  })
  q2Issues: number;

  @ApiProperty({
    description: 'Problemas asociados a la pregunta 3',
    example: 0,
  })
  q3Issues: number;

  @ApiProperty({
    description: 'Problemas asociados a la pregunta 4',
    example: 1,
  })
  q4Issues: number;

  @ApiProperty({
    description: 'Lista de problemas identificados',
    example: [
      'El usuario no identifica el botón principal',
      'No existe retroalimentación suficiente',
    ],
    type: [String],
  })
  problems: string[];
}

export class CognitiveResponseSummaryDto {
  @ApiProperty({
    description: 'Identificador de la evaluación',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  evaluationId: string;

  @ApiProperty({
    description: 'Cantidad total de respuestas',
    example: 40,
  })
  totalResponses: number;

  @ApiProperty({
    description: 'Cantidad de respuestas completadas',
    example: 32,
  })
  completedResponses: number;

  @ApiProperty({
    description: 'Cantidad de respuestas pendientes',
    example: 5,
  })
  pendingResponses: number;

  @ApiProperty({
    description: 'Cantidad de respuestas omitidas',
    example: 3,
  })
  skippedResponses: number;

  @ApiProperty({
    description: 'Cantidad de respuestas que presentan problemas',
    example: 12,
  })
  responsesWithIssues: number;

  @ApiProperty({
    description: 'Porcentaje de respuestas completadas',
    example: 80,
    minimum: 0,
    maximum: 100,
  })
  completionRate: number;

  @ApiProperty({
    description: 'Porcentaje de respuestas que presentan problemas',
    example: 30,
    minimum: 0,
    maximum: 100,
  })
  issueRate: number;

  @ApiProperty({
    description: 'Tiempo promedio de respuesta en segundos',
    example: 42.5,
  })
  averageTimeSeconds: number;

  @ApiProperty({
    description: 'Porcentaje de respuestas exitosas',
    example: 85,
    minimum: 0,
    maximum: 100,
  })
  successRate: number;

  @ApiProperty({
    description: 'Resumen de respuestas de las preguntas cognitivas',
    example: {
      q1: { yes: 30, no: 5, uncertain: 5 },
      q2: { yes: 28, no: 7, uncertain: 5 },
      q3: { yes: 32, no: 4, uncertain: 4 },
      q4: { yes: 25, no: 10, uncertain: 5 },
    },
  })
  questionsSummary: {
    q1: {
      yes: number;
      no: number;
      uncertain: number;
    };
    q2: {
      yes: number;
      no: number;
      uncertain: number;
    };
    q3: {
      yes: number;
      no: number;
      uncertain: number;
    };
    q4: {
      yes: number;
      no: number;
      uncertain: number;
    };
  };

  @ApiProperty({
    description: 'Resumen de problemas encontrados por tarea',
    type: [TaskIssueSummary],
  })
  issuesByTask: TaskIssueSummary[];
}