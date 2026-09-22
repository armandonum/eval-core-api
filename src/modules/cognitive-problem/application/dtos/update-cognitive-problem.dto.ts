import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { CognitiveProblemSeverity } from '../../domain/enums/cognitive-problem-severity.enum';
import { CognitiveProblemCategory } from '../../domain/enums/cognitive-problem-category.enum';

export class UpdateCognitiveProblemDto {
  @ApiPropertyOptional({
    description: 'Título del problema identificado',
    example: 'El usuario no identifica el botón principal',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Descripción detallada del problema',
    example:
      'El usuario presenta dificultades para localizar la acción principal.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Nivel de severidad del problema',
    enum: CognitiveProblemSeverity,
    example: CognitiveProblemSeverity.HIGH,
  })
  @IsEnum(CognitiveProblemSeverity)
  @IsOptional()
  severity?: CognitiveProblemSeverity;

  @ApiPropertyOptional({
    description: 'Categoría del problema',
    enum: CognitiveProblemCategory,
    example: CognitiveProblemCategory.USABILITY,
  })
  @IsEnum(CognitiveProblemCategory)
  @IsOptional()
  category?: CognitiveProblemCategory;

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