import {
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuestionOptionDto {

  @ApiProperty({
    example: 'Yes',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiProperty({
    example: 1,
    type: 'number',
  })
  @IsOptional()
  @IsInt()
  orderIndex?: number;
}