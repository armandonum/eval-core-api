import {
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  IsEnum,
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'
import { DeviceTypeEnum } from '../../domain/value-objects/device-type.vo'

export class CreateUsabilitySessionDto {

  @ApiProperty({
    example: 'f6b509b0-64b8-48cf-a211-fef1f49f5a96',
  })
  @IsString()
  @MaxLength(255)
  proyectId!: string

  @ApiProperty({
    required: false,
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  userId?: string

  @ApiProperty({
    required: false,
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  taskId?: string

  @ApiProperty({
    example: 'AbCdEF123456',
  })
  @IsString()
  @MaxLength(255)
  fileKey!: string

  @ApiProperty({
    required: false,
    example: '15:42',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  nodeIdInicial?: string

  @ApiProperty({
    example: 'Encuentra el botón para crear un nuevo pedido',
  })
  @IsString()
  taskDescription!: string

  @ApiProperty({
    enum: DeviceTypeEnum,
  })
  @IsEnum(DeviceTypeEnum)
  deviceType!: DeviceTypeEnum

  @ApiProperty({
    example: 'Chrome 138',
  })
  @IsString()
  browser!: string

 @ApiProperty({
    example: 'cognitive',
    enum: ['cognitive', 'heuristic', 'formal'],
    default: 'formal',
  })
  @IsOptional()
  @IsString()
  evaluationType?: string

}