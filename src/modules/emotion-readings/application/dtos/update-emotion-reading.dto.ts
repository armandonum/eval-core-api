import {
  IsDateString,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmotionReadingDto {

      @ApiProperty(
    {
        example: '1265'
    }
  )
  @IsOptional()
  @IsInt()
  @Min(0)
  elapsedMsTotal?: number;

  @ApiProperty(
    {
        example:'2026-07-10T16:20:00.000Z'
    }
  )
  @IsOptional()
  @IsDateString()
  timestampReal?: string;

  @ApiProperty(
    {
        example:'feliz',
    }
  )
  @IsOptional()
  @IsString()
  dominantEmotion?: string;

  @ApiProperty(
    {
        example: {
            feliz:'70%',
            triste: '15%',
            enojado: '0%',
        }
    }
)
  @IsOptional()
  @IsObject()
  scoresJson?: Record<string, number>;

}