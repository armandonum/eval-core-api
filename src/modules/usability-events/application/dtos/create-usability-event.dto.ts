import {
  IsUUID,
  IsString,
  IsOptional,
  IsInt,
  IsObject,
  IsDateString,
  Min,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUsabilityEventDto {

  @ApiProperty({
    example: '6b2d1e56-7baf-4a56-a70f-fb95fd1b0d66',
  })
  @IsUUID()
  session_id!: string;

  @ApiProperty({
    example: 'PRESENTED_NODE_CHANGED',
  })
  @IsString()
  event_type!: string;

  @ApiProperty({
    example: 'navegacion',
  })
  @IsString()
  event_type_normalizado!: string;

  @ApiProperty({
    example: '15:42',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  node_id?: string;

  @ApiProperty({
    example: 'Pantalla Principal',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  screen_name?: string;

  @ApiProperty({
    example: 1,
  })
  @IsInt()
  @Min(0)
  elapsed_minute!: number;

  @ApiProperty({
    example: 34,
  })
  @IsInt()
  @Min(0)
  elapsed_second!: number;

  @ApiProperty({
    example: 94321,
  })
  @IsInt()
  @Min(0)
  elapsed_ms_total!: number;

  @ApiProperty({
    example: '2026-07-10T16:20:00.000Z',
  })
  @IsDateString()
  timestamp_real!: string;

  @ApiProperty({
    example: {
      type: 'PRESENTED_NODE_CHANGED',
      presentedNodeId: '15:42',
      previousNodeId: '15:10',
    },
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsObject()
  raw_payload?: Record<string, any>;

}