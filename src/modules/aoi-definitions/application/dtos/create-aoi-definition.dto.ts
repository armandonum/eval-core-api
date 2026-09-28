import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  Max,
  IsOptional,
  IsEnum,
  MaxLength,
} from 'class-validator';

export type AoiType = 'button' | 'input' | 'text' | 'image' | 'navigation' | 'other';

export class CreateAoiDefinitionDto {
  @ApiProperty({
    description: 'ID del proyecto de Figma',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  projectId: string;

  @ApiPropertyOptional({
    description: 'ID de la tarea (opcional, si el AOI es específico de una tarea)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsOptional()
  taskId?: string;

  @ApiProperty({
    description: 'Nombre único del AOI',
    example: 'boton_registrarse',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    description: 'Descripción del AOI',
    example: 'Botón principal para registrarse',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Coordenada X1 del AOI (porcentaje 0-100)',
    example: 80.5,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  x1: number;

  @ApiProperty({
    description: 'Coordenada Y1 del AOI (porcentaje 0-100)',
    example: 10.0,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  y1: number;

  @ApiProperty({
    description: 'Coordenada X2 del AOI (porcentaje 0-100)',
    example: 95.0,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  x2: number;

  @ApiProperty({
    description: 'Coordenada Y2 del AOI (porcentaje 0-100)',
    example: 20.0,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  y2: number;

  @ApiPropertyOptional({
    description: 'Nodo de Figma asociado al AOI',
    example: '1:759',
  })
  @IsString()
  @IsOptional()
  nodeId?: string;

  @ApiPropertyOptional({
    description: 'Tipo de AOI',
    enum: ['button', 'input', 'text', 'image', 'navigation', 'other'],
    default: 'button',
  })
  @IsEnum(['button', 'input', 'text', 'image', 'navigation', 'other'])
  @IsOptional()
  aoiType?: AoiType;

  @ApiPropertyOptional({
    description: 'ID del usuario que crea el AOI',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsOptional()
  createdBy?: string;
}