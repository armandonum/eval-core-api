import {
  IsUUID,
  IsInt,
  IsDateString,
  IsString,
  IsObject,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class CreateEmotionReadingDto {
  @ApiProperty(
    {
        required: true,
        format: 'uuid',
    }
  )
  @IsUUID()
  sessionId!: string;

  @ApiProperty(
    {
        example: '1265'
    }
  )
  @IsInt()
  @Min(0)
  elapsedMsTotal!: number;

  @ApiProperty(
    {
        example:'2026-07-10T16:20:00.000Z'
    }
  )
  @IsDateString()
  timestampReal!: string;

  @ApiProperty(
    {
        example:'feliz',
    }
  )
  @IsString()
  dominantEmotion!: string;

  @ApiProperty(
    {
        example: {
            feliz:'70%',
            triste: '15%',
            enojado: '0%',
        }
    }
  )
  @IsObject()
  scoresJson!: Record<string, number>;

}