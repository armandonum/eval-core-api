import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { CognitiveEvaluatorRole } from '../../domain/enums/cognitive-evaluator-role.enum';

export class AssignCognitiveEvaluatorDto {
  @ApiProperty({
    description: 'Identificador de la evaluación cognitiva',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  evaluationId: string;

  @ApiProperty({
    description: 'Identificador del usuario que será asignado como evaluador',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiPropertyOptional({
    description: 'Rol del evaluador dentro de la evaluación',
    enum: CognitiveEvaluatorRole,
    example: CognitiveEvaluatorRole.EVALUATOR,
  })
  @IsEnum(CognitiveEvaluatorRole)
  @IsOptional()
  evaluatorRole?: CognitiveEvaluatorRole;

  @ApiPropertyOptional({
    description: 'Notas adicionales sobre la asignación del evaluador',
    example: 'Evaluador principal encargado de las pruebas con usuarios.',
  })
  @IsString()
  @IsOptional()
  notes?: string;
}