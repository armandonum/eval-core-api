import {
  IsUUID,
} from 'class-validator';

export class DeleteQuestionAnswerOptionDto {

  @IsUUID()
  answerId: string;

  @IsUUID()
  optionId: string;
}