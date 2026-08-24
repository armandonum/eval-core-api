import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFigmaNodeDto {

  @ApiProperty({
    description: 'Identificador del nodo de Figma',
    example: '1:759',
  })
  @IsString()
  nodeId: string;

  @ApiProperty({
    description: 'Proyecto al que pertenece',
    example: 'b8a4c2e8-96e7-4b75-8b9b-56c2a2c55d14',
  })
  @IsString()
  projectId: string;

  @ApiPropertyOptional({
    description: 'Nodo padre',
    example: '1:700',
  })
  @IsOptional()
  @IsString()
  parentNodeId?: string;

  @ApiProperty({
    description: 'Nombre del nodo',
    example: 'Botón Login',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Tipo del nodo',
    example: 'INSTANCE',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Profundidad dentro del árbol',
    example: 3,
  })
  @IsNumber()
  depth: number;

  @ApiProperty({
    description: 'Indica si es una pantalla',
    example: false,
  })
  @IsBoolean()
  isScreen: boolean;

  @ApiPropertyOptional({
    description: 'Component Id',
    example: '324:55',
  })
  @IsOptional()
  @IsString()
  componentId?: string;

  @ApiPropertyOptional({
    description: 'Posición X',
    example: 120.4,
  })
  @IsOptional()
  @IsNumber()
  positionX?: number;

  @ApiPropertyOptional({
    description: 'Posición Y',
    example: 280,
  })
  @IsOptional()
  @IsNumber()
  positionY?: number;

  @ApiPropertyOptional({
    description: 'Ancho',
    example: 300,
  })
  @IsOptional()
  @IsNumber()
  width?: number;

  @ApiPropertyOptional({
    description: 'Alto',
    example: 80,
  })
  @IsOptional()
  @IsNumber()
  height?: number;

  @ApiProperty({
    description: 'Nodo completo proveniente de la API de Figma',
   example: {
    "id": "1:759",
    "name": "Botón de Inicio de Sesión",
    "type": "INSTANCE",
    "position": {
      "x": 120.4,
      "y": 280
    },
    "size": {
      "width": 300,
      "height": 80
    },
    "styles": {
      "fill": "#007bff",
      "radius": 8,
      "stroke": "none"
    },
    "layers": [
      {
        "id": "1:760",
        "name": "Texto Botón",
        "type": "TEXT",
        "content": "Iniciar Sesión",
        "style": {
          "fontFamily": "Inter",
          "fontSize": 16,
          "fontWeight": 600,
          "fill": "#ffffff"
        },
        "layout": {
          "x": 30,
          "y": 25,
          "width": 240,
          "height": 30
        }
      }
    ],
    "metadata": {
      "figma_id": "1787375745",
      "version": "1.0",
      "created_at": "2026-07-14T12:06:53.588Z"
    }
  }
  })
  @IsObject()
  rawJson: Record<string, any>;
}