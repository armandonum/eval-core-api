import {
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionAnswerOptionDto {

  @ApiProperty(
    {
        example: 'uuid'
    }
  )
  @IsUUID()
  answerId: string;

  @ApiProperty(
    {
        example: 'uuid'
    }
  )
  @IsUUID()
  optionId: string;
}