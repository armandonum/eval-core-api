import {
  IsEnum, IsOptional, IsString
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'
import { SessionStatusEnum } from '../../domain/value-objects/session-status.vo'

export class FinishUsabilitySessionDto {

  @ApiProperty({
    enum: [
      SessionStatusEnum.COMPLETED,
      SessionStatusEnum.ABANDONED,
    ],
  })
  @IsEnum([
    SessionStatusEnum.COMPLETED,
    SessionStatusEnum.ABANDONED,
  ])
  status!: SessionStatusEnum

  @ApiProperty()
  durationSeconds: string

  @ApiProperty({
    example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  faceVideoKey?: string


  @ApiProperty({
    example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  screenVideKey?: string

}