import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateCognitiveRuleDto {
  @ApiPropertyOptional({
    description: 'Orden de la regla dentro de la evaluación',
    example: 2,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  ruleOrder?: number;

  @ApiPropertyOptional({
    description: 'Descripción de la regla cognitiva',
    example:
      'El usuario debe completar la tarea sin recibir ayuda externa.',
  })
  @IsString()
  @IsOptional()
  description?: string;
}