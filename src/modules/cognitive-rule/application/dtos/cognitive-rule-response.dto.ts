import { ApiProperty } from '@nestjs/swagger';

export class CognitiveRuleResponseDto {
  @ApiProperty({
    description: 'Identificador de la regla cognitiva',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Identificador de la evaluación cognitiva',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  evaluationId: string;

  @ApiProperty({
    description: 'Orden de la regla dentro de la evaluación',
    example: 1,
  })
  ruleOrder: number;

  @ApiProperty({
    description: 'Descripción de la regla cognitiva',
    example:
      'El usuario debe completar la tarea sin recibir ayuda externa.',
  })
  description: string;

  @ApiProperty({
    description: 'Fecha de creación de la regla',
    example: '2026-08-13T10:00:00.000Z',
  })
  createdAt: Date;


}