import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import { CognitiveEvaluatorRole } from '../../domain/enums/cognitive-evaluator-role.enum';

export class UpdateCognitiveEvaluatorDto {
  @ApiPropertyOptional({
    description: 'Rol del evaluador dentro de la evaluación',
    enum: CognitiveEvaluatorRole,
    example: CognitiveEvaluatorRole.EVALUATOR,
  })
  @IsEnum(CognitiveEvaluatorRole)
  @IsOptional()
  evaluatorRole?: CognitiveEvaluatorRole;

  @ApiPropertyOptional({
    description: 'Notas adicionales sobre el evaluador',
    example: 'Responsable de revisar las tareas completadas.',
  })
  @IsString()
  @IsOptional()
  notes?: string;
}