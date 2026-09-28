import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  Max,
  IsInt,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateGazeAoiMetricDto {
  @ApiProperty({ description: 'ID de la sesión', example: 'abc-123' })
  @IsUUID()
  @IsNotEmpty()
  sessionId: string;

  @ApiProperty({ description: 'Nombre del AOI', example: 'boton_registrarse' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  aoiName: string;

  @ApiProperty({ description: 'Coordenada X1 (0-100)', example: 80.5 })
  @IsNumber()
  @Min(0)
  @Max(100)
  aoiX1: number;

  @ApiProperty({ description: 'Coordenada Y1 (0-100)', example: 10.0 })
  @IsNumber()
  @Min(0)
  @Max(100)
  aoiY1: number;

  @ApiProperty({ description: 'Coordenada X2 (0-100)', example: 95.0 })
  @IsNumber()
  @Min(0)
  @Max(100)
  aoiX2: number;

  @ApiProperty({ description: 'Coordenada Y2 (0-100)', example: 20.0 })
  @IsNumber()
  @Min(0)
  @Max(100)
  aoiY2: number;

  @ApiProperty({ description: 'TFF - Time to First Fixation (ms)', example: 1200 })
  @IsInt()
  @Min(0)
  timeToFirstFixationMs: number;

  @ApiProperty({ description: 'FC - Fixation Count', example: 5 })
  @IsInt()
  @Min(0)
  fixationCount: number;

  @ApiProperty({ description: 'TFD - Total Fixation Duration (ms)', example: 2500 })
  @IsInt()
  @Min(0)
  totalFixationDurationMs: number;

  @ApiProperty({ description: 'FB - Fixations Before', example: 3 })
  @IsInt()
  @Min(0)
  fixationsBefore: number;

  @ApiProperty({ description: 'Porcentaje del tiempo mirando el AOI', example: 15.5 })
  @IsNumber()
  @Min(0)
  @Max(100)
  percentageFixated: number;

  @ApiPropertyOptional({ description: 'Nodo de Figma', example: '1:759' })
  @IsString()
  @IsOptional()
  nodeId?: string;
}