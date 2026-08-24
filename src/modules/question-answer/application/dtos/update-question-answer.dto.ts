import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'

export class UpdateQuestionAnswerDto {

  @IsOptional()
  @IsString()
  answerText?: string

  @IsOptional()
  @IsUUID()
  selectedOptionId?: string

  @IsOptional()
  @IsInt()
  scaleValue?: number

  @IsOptional()
  @IsBoolean()
  booleanValue?: boolean

  @IsOptional()
  @IsBoolean()
  isNotApplicable?: boolean
}