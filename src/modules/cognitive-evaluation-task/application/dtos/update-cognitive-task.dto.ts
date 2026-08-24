import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { CognitiveTaskStatus } from '../../domain/enums/cognitive-task-status.enum';

export class UpdateCognitiveTaskDto {
  @ApiPropertyOptional({
    description: 'Título de la tarea cognitiva',
    example: 'Buscar un destino turístico',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Descripción detallada de la tarea',
    example: 'El usuario debe encontrar un destino turístico.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Objetivo que debe alcanzar el usuario durante la tarea',
    example: 'Encontrar un destino y consultar su información.',
  })
  @IsString()
  @IsOptional()
  userGoal?: string;

  @ApiPropertyOptional({
    description: 'Posición de la tarea dentro de la evaluación',
    example: 2,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  orderIndex?: number;

  @ApiPropertyOptional({
    description: 'Estado actual de la tarea cognitiva',
    enum: CognitiveTaskStatus,
    example: CognitiveTaskStatus.PENDING,
  })
  @IsEnum(CognitiveTaskStatus)
  @IsOptional()
  status?: CognitiveTaskStatus;
}