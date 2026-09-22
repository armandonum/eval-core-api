import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateCognitiveEvaluationDto {
  @ApiProperty({
    description: 'Identificador del proyecto al que pertenece la evaluación',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  projectId: string;

  @ApiProperty({
    description: 'Nombre de la evaluación cognitiva',
    example: 'Evaluación cognitiva de usabilidad',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'Descripción de la evaluación cognitiva',
    example: 'Evaluación para analizar la carga cognitiva durante el uso del sistema',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Identificador del supervisor responsable de la evaluación',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsUUID()
  @IsNotEmpty()
  supervisorId: string;

  @ApiPropertyOptional({
    description: 'Duración máxima de la evaluación en minutos',
    example: 30,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  maxDurationMinutes?: number;

  @ApiPropertyOptional({
    description: 'Descripción del usuario objetivo de la evaluación',
    example: 'Usuarios entre 18 y 35 años con conocimientos básicos de tecnología',
  })
  @IsString()
  @IsOptional()
  targetUserDescription?: string;

  @ApiPropertyOptional({
    description: 'Descripción del sistema que será evaluado',
    example: 'Plataforma web de turismo para búsqueda y reserva de destinos',
  })
  @IsString()
  @IsOptional()
  systemDescription?: string;
}