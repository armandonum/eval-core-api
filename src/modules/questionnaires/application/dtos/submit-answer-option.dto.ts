import {
  IsUUID,
} from 'class-validator';

export class SubmitAnswerOptionDto {

  @IsUUID()
  optionId: string;
}