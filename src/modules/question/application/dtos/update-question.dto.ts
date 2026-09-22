import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

import { QuestionType } from '../../domain/enums/question-type.enum';

export class UpdateQuestionDto {

  @IsOptional()
  @IsInt()
  orderIndex?: number;

  @IsOptional()
  @IsString()
  questionText?: string;

  @IsOptional()
  @IsEnum(QuestionType)
  questionType?: QuestionType;

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @IsOptional()
  @IsInt()
  scaleMin?: number;

  @IsOptional()
  @IsInt()
  scaleMax?: number;

  @IsOptional()
  @IsBoolean()
  allowNotApplicable?: boolean;
}