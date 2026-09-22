import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionOptionDto {

  @ApiProperty({
    example: 'f9168c5e-ceb2-4eaa-b6ac-1f6fdd8b11ee',
    type: 'string',
    format: 'uuid',
  })
  @IsUUID()
  questionId: string;

  @ApiProperty({
    example: 'Yes',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({
    example: 1,
    type: 'number',
  })
  @IsInt()
  orderIndex: number;
}