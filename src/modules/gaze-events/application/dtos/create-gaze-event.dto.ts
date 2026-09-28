import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsInt,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';

export type GazeEventType = 'raw' | 'fixation' | 'saccade';

export class CreateGazeEventDto {
  @ApiProperty({
    description: 'ID de la sesión de usabilidad',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  sessionId: string;

  @ApiProperty({
    description: 'Tiempo transcurrido desde el inicio de la sesión (ms)',
    example: 12345,
  })
  @IsInt()
  @Min(0)
  elapsedMsTotal: number;

  @ApiProperty({
    description: 'Coordenada X normalizada (0-1)',
    example: 0.452,
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  gazeX: number;

  @ApiProperty({
    description: 'Coordenada Y normalizada (0-1)',
    example: 0.723,
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  gazeY: number;

  @ApiProperty({
    description: 'Confianza de la detección (0-1)',
    example: 0.85,
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  confidence: number;

  @ApiProperty({
    description: 'Ancho del viewport en el momento de la captura',
    example: 1920,
  })
  @IsInt()
  @Min(1)
  viewportWidth: number;

  @ApiProperty({
    description: 'Alto del viewport en el momento de la captura',
    example: 1080,
  })
  @IsInt()
  @Min(1)
  viewportHeight: number;

  @ApiPropertyOptional({
    description: 'Nodo de Figma bajo la mirada',
    example: '1:759',
  })
  @IsString()
  @IsOptional()
  nodeId?: string;

  @ApiPropertyOptional({
    description: 'Tipo de evento de mirada',
    enum: ['raw', 'fixation', 'saccade'],
    default: 'raw',
  })
  @IsEnum(['raw', 'fixation', 'saccade'])
  @IsOptional()
  eventType?: GazeEventType;

  @ApiPropertyOptional({
    description: 'Duración del evento (solo para fijaciones)',
    example: 250,
    default: 0,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  durationMs?: number;
}