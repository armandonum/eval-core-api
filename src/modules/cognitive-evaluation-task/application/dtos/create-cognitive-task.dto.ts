import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateCognitiveTaskDto {
  @ApiProperty({
    description: 'Identificador de la evaluación cognitiva a la que pertenece la tarea',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  evaluationId: string;

  @ApiPropertyOptional({
    description: 'Identificador de la tarea del proyecto asociada',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsUUID()
  @IsOptional()
  projectTaskId?: string;

  @ApiProperty({
    description: 'Título de la tarea cognitiva',
    example: 'Buscar un destino turístico',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'Descripción detallada de la tarea',
    example: 'El usuario debe encontrar un destino turístico y consultar su información.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Objetivo que debe alcanzar el usuario durante la tarea',
    example: 'Encontrar un destino y verificar su disponibilidad.',
  })
  @IsString()
  @IsOptional()
  userGoal?: string;

  @ApiPropertyOptional({
    description: 'Posición de la tarea dentro de la evaluación',
    example: 1,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  orderIndex?: number;
}