import {
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  IsObject,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTextSentimentDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  sessionId?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  originalLabel: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  uxLabel: string;

  @ApiProperty({
    example: 0.9865,
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  confidence: number;

  @ApiProperty({
    example: {
      positive: 0.95,
      neutral: 0.03,
      negative: 0.02,
    },
  })
  @IsObject()
  scoresJson: Record<string, any>;

  @ApiPropertyOptional({
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  elapsedMsTotal?: number;

  @ApiPropertyOptional()
  @IsOptional()
  timestampReal?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  authorId?: string;
}