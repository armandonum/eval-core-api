import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateCognitiveRuleDto {
  @ApiProperty({
    description: 'Identificador de la evaluación cognitiva a la que pertenece la regla',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  evaluationId: string;

  @ApiPropertyOptional({
    description: 'Orden de la regla dentro de la evaluación',
    example: 1,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  ruleOrder?: number;

  @ApiProperty({
    description: 'Descripción de la regla cognitiva',
    example:
      'El usuario debe completar la tarea sin recibir ayuda externa.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}