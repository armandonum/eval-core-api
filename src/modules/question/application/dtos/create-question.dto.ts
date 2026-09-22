import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { QuestionType } from '../../domain/enums/question-type.enum';

export class CreateQuestionDto {
  @ApiProperty()
  @IsUUID()
  questionnaireId: string;

  @ApiProperty()
  @IsInt()
  orderIndex: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  questionText: string;

  @ApiProperty()
  @IsEnum(QuestionType)
  questionType: QuestionType;

  @ApiProperty()
  @IsBoolean()
  isRequired: boolean;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  scaleMin?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  scaleMax?: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  allowNotApplicable: boolean;
}