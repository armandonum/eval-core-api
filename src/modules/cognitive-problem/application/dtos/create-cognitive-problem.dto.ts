import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { CognitiveProblemSeverity } from '../../domain/enums/cognitive-problem-severity.enum';
import { CognitiveProblemCategory } from '../../domain/enums/cognitive-problem-category.enum';

export class CreateCognitiveProblemDto {
  @ApiProperty({
    description: 'Identificador de la evaluación cognitiva',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  evaluationId: string;

  @ApiProperty({
    description: 'Título del problema identificado',
    example: 'El usuario no identifica el botón principal',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Descripción detallada del problema',
    example:
      'Durante la evaluación se observó que el usuario tuvo dificultades para localizar la acción principal.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    description: 'Nivel de severidad del problema',
    enum: CognitiveProblemSeverity,
    example: CognitiveProblemSeverity.HIGH,
  })
  @IsEnum(CognitiveProblemSeverity)
  @IsOptional()
  severity?: CognitiveProblemSeverity;

  @ApiPropertyOptional({
    description: 'Categoría a la que pertenece el problema',
    enum: CognitiveProblemCategory,
    example: CognitiveProblemCategory.USABILITY,
  })
  @IsEnum(CognitiveProblemCategory)
  @IsOptional()
  category?: CognitiveProblemCategory;

  @ApiPropertyOptional({
    description: 'Identificador del usuario que reportó el problema',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsUUID()
  @IsOptional()
  reportedBy?: string;

  @ApiPropertyOptional({
    description: 'Lista de identificadores de las tareas afectadas',
    example: [
      '550e8400-e29b-41d4-a716-446655440002',
      '550e8400-e29b-41d4-a716-446655440003',
    ],
    type: [String],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  affectedTasks?: string[];
}