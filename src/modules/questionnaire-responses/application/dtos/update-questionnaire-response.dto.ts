import {
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuestionnaireResponseDto {

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  sessionId?: string | null;
}