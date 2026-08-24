// application/dtos/create-heatmap-event.dto.ts

import {
  IsUUID,
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  Min,
  Max,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateHeatmapEventDto {
  @ApiProperty({
    description: 'Identificador de la sesión de usabilidad',
    example: '9c81cf81-3216-41da-97c6-f7560d506333',
  })
  @IsUUID()
  sessionId!: string;

  @ApiProperty({
    description: 'Identificador del proyecto',
    example: 'b7c8d9e0-1234-4567-8901-abcdef123456',
  })
  @IsUUID()
  projectId!: string;

  @ApiPropertyOptional({
    description: 'Identificador del usuario que realizó la interacción',
    example: 'd0c131b6-ade1-4059-a520-2a3b7c06ac08',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({
    description: 'Tipo de evento registrado en la interacción',
    enum: ['click', 'move', 'scroll', 'dwell', 'resize'],
    example: 'click',
  })
  @IsEnum(['click', 'move', 'scroll', 'dwell', 'resize'])
  eventType!: 'click' | 'move' | 'scroll' | 'dwell' | 'resize';

  @ApiPropertyOptional({
    description: 'Identificador del nodo de Figma asociado al evento',
    example: '45:123',
  })
  @IsOptional()
  @IsString()
  nodeId?: string;

  @ApiPropertyOptional({
    description: 'Identificador de la pantalla donde ocurrió el evento',
    example: 'home-screen',
  })
  @IsOptional()
  @IsString()
  screenIdentifier?: string;

  @ApiProperty({
    description: 'Posición horizontal del evento expresada como porcentaje',
    minimum: 0,
    maximum: 100,
    example: 45.5,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  xPct!: number;

  @ApiProperty({
    description: 'Posición vertical del evento expresada como porcentaje',
    minimum: 0,
    maximum: 100,
    example: 62.3,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  yPct!: number;

  @ApiProperty({
    description: 'Ancho del viewport del dispositivo en píxeles',
    example: 1920,
  })
  @IsNumber()
  viewportWidth!: number;

  @ApiProperty({
    description: 'Alto del viewport del dispositivo en píxeles',
    example: 1080,
  })
  @IsNumber()
  viewportHeight!: number;

  @ApiPropertyOptional({
    description: 'Profundidad del scroll expresada como porcentaje',
    minimum: 0,
    maximum: 100,
    example: 35.5,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  scrollDepth?: number;

  @ApiPropertyOptional({
    description: 'Selector o identificador del elemento asociado al evento',
    example: '#search-button',
  })
  @IsOptional()
  @IsString()
  elementSelector?: string;

  @ApiPropertyOptional({
    description: 'Tiempo de permanencia sobre el elemento en milisegundos',
    minimum: 0,
    example: 1250,
  })
  @IsOptional()
  @IsNumber()
  dwellMs?: number;

  @ApiProperty({
    description: 'Tiempo total transcurrido desde el inicio de la sesión en milisegundos',
    minimum: 0,
    example: 41641,
  })
  @IsNumber()
  @Min(0)
  elapsedMsTotal!: number;

  @ApiPropertyOptional({
    description: 'User-Agent del navegador utilizado durante la sesión',
    example:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/151.0.0.0 Safari/537.36',
  })
  @IsOptional()
  @IsString()
  userAgent?: string;

  @ApiPropertyOptional({
    description: 'Tipo de dispositivo utilizado durante la evaluación',
    enum: ['desktop', 'mobile', 'tablet'],
    example: 'desktop',
  })
  @IsOptional()
  @IsEnum(['desktop', 'mobile', 'tablet'])
  deviceType?: 'desktop' | 'mobile' | 'tablet';

  @ApiPropertyOptional({
    description: 'Navegador utilizado durante la evaluación',
    example: 'Chrome',
  })
  @IsOptional()
  @IsString()
  browser?: string;
}

