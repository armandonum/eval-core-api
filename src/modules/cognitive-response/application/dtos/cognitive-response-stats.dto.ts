import { ApiProperty } from '@nestjs/swagger';

export class CognitiveResponseStatsDto {
  @ApiProperty({
    description: 'Cantidad total de respuestas',
    example: 40,
  })
  total: number;

  @ApiProperty({
    description: 'Cantidad de respuestas completadas',
    example: 32,
  })
  completed: number;

  @ApiProperty({
    description: 'Cantidad de respuestas pendientes',
    example: 5,
  })
  pending: number;

  @ApiProperty({
    description: 'Cantidad de respuestas omitidas',
    example: 3,
  })
  skipped: number;

  @ApiProperty({
    description: 'Cantidad de respuestas con problemas',
    example: 12,
  })
  withIssues: number;

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
    description: 'Estadísticas de respuestas para cada pregunta cognitiva',
    example: {
      q1Yes: 30,
      q1No: 5,
      q1Uncertain: 5,
      q2Yes: 28,
      q2No: 7,
      q2Uncertain: 5,
      q3Yes: 32,
      q3No: 4,
      q3Uncertain: 4,
      q4Yes: 25,
      q4No: 10,
      q4Uncertain: 5,
    },
  })
  questionStats: {
    q1Yes: number;
    q1No: number;
    q1Uncertain: number;

    q2Yes: number;
    q2No: number;
    q2Uncertain: number;

    q3Yes: number;
    q3No: number;
    q3Uncertain: number;

    q4Yes: number;
    q4No: number;
    q4Uncertain: number;
  };
}