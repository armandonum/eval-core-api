import {
  IsArray,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

import { SubmitAnswerDto } from './submit-answer.dto';

export class SubmitQuestionnaireDto {

  @IsUUID()
  questionnaireId: string;

  @IsUUID()
  participantId: string;

  @IsOptional()
  @IsUUID()
  sessionId?: string;

  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => SubmitAnswerDto)
  answers: SubmitAnswerDto[];
}