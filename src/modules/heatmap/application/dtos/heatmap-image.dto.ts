// application/dtos/heatmap-image.dto.ts

import {
  IsUUID,
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  Min,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

// ============================================================
// GENERATE HEATMAP IMAGE DTO
// ============================================================

export class GenerateHeatmapImageDto {
  @ApiProperty({
    description: 'Identificador del proyecto',
    example: 'b7c8d9e0-1234-4567-8901-abcdef123456',
  })
  @IsUUID()
  projectId!: string;

  @ApiProperty({
    description: 'Identificador del nodo de Figma',
    example: '45:123',
  })
  @IsString()
  nodeId!: string;

  @ApiProperty({
    description: 'Tipo de evento utilizado para generar el mapa de calor',
    enum: ['click', 'move', 'scroll'],
    example: 'click',
  })
  @IsEnum(['click', 'move', 'scroll'])
  eventType!: 'click' | 'move' | 'scroll';



  @ApiPropertyOptional({
    description: 'Tipo de dispositivo utilizado durante las sesiones',
    enum: ['desktop', 'mobile', 'tablet'],
    example: 'desktop',
  })
  @IsOptional()
  @IsEnum(['desktop', 'mobile', 'tablet'])
  deviceType?: 'desktop' | 'mobile' | 'tablet';

  @ApiPropertyOptional({
    description: 'Cantidad mínima de sesiones requeridas para generar el mapa de calor',
    minimum: 1,
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  minSessions?: number;

  // 🔥 NUEVOS CAMPOS (también aquí)

  @ApiPropertyOptional({
    description: 'ID de la sesión para generar el mapa de calor de una sesión específica',
    example: '9c81cf81-3216-41da-97c6-f7560d506333',
  })
  @IsOptional()
  @IsUUID()
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'Tiempo de inicio en ms desde el inicio de la sesión',
    example: 60000, // minuto 1
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  timeRangeStartMs?: number;

  @ApiPropertyOptional({
    description: 'Tiempo de fin en ms desde el inicio de la sesión',
    example: 120000, // minuto 2
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  timeRangeEndMs?: number;
}

// ============================================================
// GET HEATMAP DATA DTO
// ============================================================

export class GetHeatmapDataDto {
  @ApiProperty({
    description: 'Identificador del proyecto',
    example: 'b7c8d9e0-1234-4567-8901-abcdef123456',
  })
  @IsUUID()
  projectId!: string;

  @ApiPropertyOptional({
    description: 'Identificador del nodo de Figma a consultar',
    example: '45:123',
  })
  @IsOptional()
  @IsString()
  nodeId?: string;

  @ApiProperty({
    description: 'Tipo de evento utilizado para obtener los datos',
    enum: ['click', 'move', 'scroll'],
    example: 'click',
  })
  @IsEnum(['click', 'move', 'scroll'])
  eventType!: 'click' | 'move' | 'scroll';

  @ApiPropertyOptional({
    description: 'Tipo de dispositivo utilizado durante las sesiones',
    enum: ['desktop', 'mobile', 'tablet'],
    example: 'desktop',
  })
  @IsOptional()
  @IsEnum(['desktop', 'mobile', 'tablet'])
  deviceType?: 'desktop' | 'mobile' | 'tablet';

  // 🔥 NUEVOS CAMPOS (ya los tenías)
  @ApiPropertyOptional({
    description: 'ID de la sesión para obtener datos de una sesión específica',
    example: '9c81cf81-3216-41da-97c6-f7560d506333',
  })
  @IsOptional()
  @IsUUID()
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'Tiempo de inicio en ms desde el inicio de la sesión',
    example: 60000,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  timeRangeStartMs?: number;

  @ApiPropertyOptional({
    description: 'Tiempo de fin en ms desde el inicio de la sesión',
    example: 120000,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  timeRangeEndMs?: number;
}