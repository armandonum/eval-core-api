import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFlowClickDto {

  @ApiProperty({
    example: '5a8e6f69-c90f-4a3d-b738-74636fce7635',
    description: 'UUID del flujo',
  })
  @IsUUID()
  flowId: string;

  @ApiProperty({
    example: 1,
    description: 'Orden del click dentro del flujo',
  })
  @IsInt()
  @Min(1)
  orderIndex: number;

  @ApiProperty({
    example: '1:785',
    description: 'Node ID del elemento clickeado en Figma',
  })
  @IsString()
  nodeId: string;

  @ApiPropertyOptional({
    example: '1:790',
    description: 'Node ID de la pantalla/overlay presentado al momento del click',
  })
  @IsOptional()
  @IsString()
  presentedNodeId?: string;

}