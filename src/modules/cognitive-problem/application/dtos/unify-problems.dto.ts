import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

import { CognitiveProblemSeverity } from '../../domain/enums/cognitive-problem-severity.enum';
import { CognitiveProblemCategory } from '../../domain/enums/cognitive-problem-category.enum';

export class UnifyProblemsDto {
  @ApiProperty({
    description: 'Lista de problemas que serán unificados',
    type: [String],
    example: [
      '550e8400-e29b-41d4-a716-446655440000',
      '550e8400-e29b-41d4-a716-446655440001',
    ],
  })
  @IsArray()
  @ArrayMinSize(2)
  @IsUUID('4', { each: true })
  @IsNotEmpty()
  problemIds: string[];

  @ApiProperty({
    description: 'Título del nuevo problema unificado',
    example: 'Problemas de navegación durante la búsqueda',
  })
  @IsString()
  @IsNotEmpty()
  unifiedTitle: string;

  @ApiProperty({
    description: 'Descripción del problema unificado',
    example:
      'Se identificaron múltiples dificultades relacionadas con la navegación durante el proceso de búsqueda.',
  })
  @IsString()
  @IsNotEmpty()
  unifiedDescription: string;

  @ApiProperty({
    description: 'Nivel de severidad del problema unificado',
    enum: CognitiveProblemSeverity,
    example: CognitiveProblemSeverity.HIGH,
  })
  @IsEnum(CognitiveProblemSeverity)
  severity: CognitiveProblemSeverity;

  @ApiProperty({
    description: 'Categoría del problema unificado',
    enum: CognitiveProblemCategory,
    example: CognitiveProblemCategory.NAVIGATION,
  })
  @IsEnum(CognitiveProblemCategory)
  category: CognitiveProblemCategory;
}