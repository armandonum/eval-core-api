import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateQuestionAnswerDto {

  @ApiProperty({
    example: 'uuid'
  })
  @IsUUID()
  responseId: string

  @ApiProperty({
    example: 'uuid'
  })
  @IsUUID()
  questionId: string

  @ApiProperty({
    example: ' mi respuesta'
  })
  @IsOptional()
  @IsString()
  answerText?: string


  @ApiProperty({
    example: 'uuid()'
  })
  @IsOptional()
  @IsUUID()
  selectedOptionId?: string

  @ApiProperty({
    example: '2'
  })
  @IsOptional()
  @IsInt()
  scaleValue?: number

  @ApiProperty({
    example: true
  })
  @IsOptional()
  @IsBoolean()
  booleanValue?: boolean

  @ApiProperty({
    example: true
  })
  @IsOptional()
  @IsBoolean()
  isNotApplicable?: boolean
}