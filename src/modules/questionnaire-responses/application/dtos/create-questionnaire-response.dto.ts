import {
  IsOptional,
  IsUUID,
} from 'class-validator';

import {ApiProperty } from '@nestjs/swagger'

export class CreateQuestionnaireResponseDto {

@ApiProperty({
    example:'uuid'
})
  @IsUUID()
  questionnaireId: string;

  @ApiProperty({
    example:'uuid'
})
  @IsUUID()
  participantId: string;

  @ApiProperty({
    example:'uuid'
})
  @IsOptional()
  @IsUUID()
  sessionId?: string;
}