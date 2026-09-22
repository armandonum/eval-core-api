import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { CognitiveEvaluationStatus } from '../../domain/enums/cognitive-evaluation-status.enum';

export class UpdateCognitiveEvaluationDto {
  @ApiPropertyOptional({
    description: 'Nombre de la evaluación cognitiva',
    example: 'Evaluación cognitiva actualizada',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Descripción de la evaluación cognitiva',
    example: 'Evaluación para analizar la carga cognitiva durante el uso del sistema',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Duración máxima de la evaluación en minutos',
    example: 45,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  maxDurationMinutes?: number;

  @ApiPropertyOptional({
    description: 'Descripción del usuario objetivo de la evaluación',
    example: 'Usuarios con conocimientos básicos de tecnología',
  })
  @IsString()
  @IsOptional()
  targetUserDescription?: string;

  @ApiPropertyOptional({
    description: 'Descripción del sistema que será evaluado',
    example: 'Plataforma web de turismo',
  })
  @IsString()
  @IsOptional()
  systemDescription?: string;

  @ApiPropertyOptional({
    description: 'Estado actual de la evaluación cognitiva',
    enum: CognitiveEvaluationStatus,
    example: CognitiveEvaluationStatus.DRAFT,
  })
  @IsEnum(CognitiveEvaluationStatus)
  @IsOptional()
  status?: CognitiveEvaluationStatus;
}