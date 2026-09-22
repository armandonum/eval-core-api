import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'

import { ApiPropertyOptional } from '@nestjs/swagger'
import { DeviceTypeEnum } from '../../domain/value-objects/device-type.vo'

export class UpdateUsabilitySessionDto {

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  nodeIdInicial?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  taskDescription?: string

  @ApiPropertyOptional({
    enum: DeviceTypeEnum,
  })
  @IsOptional()
  @IsEnum(DeviceTypeEnum)
  deviceType?: DeviceTypeEnum

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  browser?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  faceVideoKey?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  screenVideKey?: string

}