import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

import { SubmitAnswerOptionDto } from './submit-answer-option.dto';

export class SubmitAnswerDto {

  @IsUUID()
  questionId: string;

  @IsOptional()
  @IsString()
  answerText?: string;

  @IsOptional()
  @IsUUID()
  selectedOptionId?: string;

  @IsOptional()
  @IsInt()
  scaleValue?: number;

  @IsOptional()
  @IsBoolean()
  booleanValue?: boolean;

  @IsOptional()
  @IsBoolean()
  isNotApplicable?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => SubmitAnswerOptionDto)
  options?: SubmitAnswerOptionDto[];
}